import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100; // Max requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const window = rateLimitStore.get(ip);

  if (!window || window.resetTime <= now) {
    // Create new window
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (window.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetTime: window.resetTime };
  }

  // Increment count
  rateLimitStore.set(ip, { count: window.count + 1, resetTime: window.resetTime });
  return { allowed: true };
}

export async function middleware(request: NextRequest) {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
        return new NextResponse(
            'Rate limit exceeded. Try again later.',
            { status: 429 }
        );
    }

    // Security headers
    const response = NextResponse.next();
    
    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    const sessionCookie = getSessionCookie(request);

    // Allow access to public routes
    const publicPaths = ['/sign-in', '/sign-up', '/api/inngest', '/api/finnhub'];
    const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
    
    if (isPublicPath) {
        return response;
    }

    // Redirect unauthenticated users to sign-in page
    if (!sessionCookie) {
        const url = new URL('/sign-in', request.url);
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};