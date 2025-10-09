'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20; // Max requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds

function checkRateLimit(userId: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const window = rateLimitStore.get(userId);

  if (!window || window.resetTime <= now) {
    // Create new window
    rateLimitStore.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (window.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetTime: window.resetTime };
  }

  // Increment count
  rateLimitStore.set(userId, { count: window.count + 1, resetTime: window.resetTime });
  return { allowed: true };
}

// Input validation function for stock symbols
function validateStockSymbol(symbol: string): boolean {
  // Stock symbols are typically 1-10 characters, alphanumeric with dots and hyphens
  return /^[A-Z0-9.-]{1,10}$/.test(symbol);
}

// Input validation function for company names
function validateCompanyName(company: string): boolean {
  // Company names should be 1-100 characters, alphanumeric, spaces, and some special chars
  return /^[\w\s.,'"&-]{1,100}$/.test(company);
}

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(userId: string, symbol: string, company: string) {
  // Rate limiting
  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    throw new Error('Rate limit exceeded for watchlist operations');
  }

  // Input validation
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  if (!validateStockSymbol(symbol)) {
    throw new Error('Invalid stock symbol');
  }

  if (!validateCompanyName(company)) {
    throw new Error('Invalid company name');
  }

  try {
    await connectToDatabase();
    
    const newItem = await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase().trim(),
      company: company.trim(),
    });

    return { success: true, data: newItem };
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('This stock is already in your watchlist');
    }
    console.error('addToWatchlist error:', error);
    throw new Error('Failed to add stock to watchlist');
  }
}

export async function removeFromWatchlist(userId: string, symbol: string) {
  // Rate limiting
  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    throw new Error('Rate limit exceeded for watchlist operations');
  }

  // Input validation
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  if (!validateStockSymbol(symbol)) {
    throw new Error('Invalid stock symbol');
  }

  try {
    await connectToDatabase();
    
    const deletedItem = await Watchlist.findOneAndDelete({
      userId,
      symbol: symbol.toUpperCase().trim(),
    });

    if (!deletedItem) {
      throw new Error('Stock not found in watchlist');
    }

    return { success: true };
  } catch (error: any) {
    console.error('removeFromWatchlist error:', error);
    throw new Error('Failed to remove stock from watchlist');
  }
}

export async function getUserWatchlist(userId: string) {
  // Rate limiting
  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    throw new Error('Rate limit exceeded for watchlist operations');
  }

  // Input validation
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  try {
    await connectToDatabase();
    
    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 });
    return { success: true, data: items };
  } catch (error: any) {
    console.error('getUserWatchlist error:', error);
    throw new Error('Failed to fetch watchlist');
  }
}