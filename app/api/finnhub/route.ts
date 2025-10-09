import { NextRequest } from 'next/server';
import { getDateRange, validateArticle } from '@/lib/utils';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

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

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }),
        { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimit.resetTime! - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Check API key
    if (!FINNHUB_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'FinnHub API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get('symbols');
    const symbols = symbolsParam ? symbolsParam.split(',') : [];

    // Input validation
    if (symbols.some(symbol => !/^[A-Z0-9.-]{1,10}$/.test(symbol))) {
      return new Response(
        JSON.stringify({ error: 'Invalid stock symbol provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const range = getDateRange(5);
    const cleanSymbols = (symbols || [])
      .map((s) => s?.trim().toUpperCase())
      .filter((s) => Boolean(s));

    const maxArticles = 6;
    let allArticles: any[] = [];

    // If we have symbols, try to fetch company news per symbol and round-robin select
    if (cleanSymbols.length > 0) {
      const perSymbolArticles: Record<string, any[]> = {};

      await Promise.all(
        cleanSymbols.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(sym)}&from=${range.from}&to=${range.to}&token=${FINNHUB_API_KEY}`;
            const response = await fetch(url, { cache: 'force-cache', next: { revalidate: 300 } });
            
            if (!response.ok) {
              throw new Error(`FinnHub API error: ${response.status}`);
            }
            
            const articles = await response.json();
            perSymbolArticles[sym] = (articles || []).filter(validateArticle);
          } catch (e) {
            console.error('Error fetching company news for', sym, e);
            perSymbolArticles[sym] = [];
          }
        })
      );

      // Round-robin selection of articles
      const maxLength = Math.max(...Object.values(perSymbolArticles).map(arr => arr.length));
      for (let i = 0; i < maxLength && allArticles.length < maxArticles; i++) {
        for (const symbol of cleanSymbols) {
          if (allArticles.length >= maxArticles) break;
          const articles = perSymbolArticles[symbol];
          if (i < articles.length) {
            allArticles.push({ ...articles[i], symbol });
          }
        }
      }
    } else {
      // Fetch general market news
      try {
        const url = `${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`;
        const response = await fetch(url, { cache: 'force-cache', next: { revalidate: 300 } });
        
        if (!response.ok) {
          throw new Error(`FinnHub API error: ${response.status}`);
        }
        
        const articles = await response.json();
        allArticles = (articles || [])
          .filter(validateArticle)
          .slice(0, maxArticles)
          .map((article: any) => ({ ...article, symbol: 'GENERAL' }));
      } catch (e) {
        console.error('Error fetching general news', e);
        allArticles = [];
      }
    }

    return new Response(
      JSON.stringify(allArticles),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300'
        }
      }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}