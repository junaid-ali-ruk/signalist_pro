'use server';

import {connectToDatabase} from "@/database/mongoose";

// Input validation functions
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name: string): boolean {
  return typeof name === 'string' && name.length >= 1 && name.length <= 50;
}

export const getAllUsersForNewsEmail = async () => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Mongoose connection not connected');

        const users = await db.collection('user').find(
            { email: { $exists: true, $ne: null }},
            { projection: { _id: 1, id: 1, email: 1, name: 1, country:1 }}
        ).toArray();

        // Validate and filter users
        return users
          .filter((user) => user.email && user.name && validateEmail(user.email) && validateName(user.name))
          .map((user) => ({
              id: user.id || user._id?.toString() || '',
              email: user.email,
              name: user.name
          }));
    } catch (e) {
        console.error('getAllUsersForNewsEmail error:', e);
        // Return empty array instead of throwing to prevent cascading failures
        return [];
    }
}

// Add a function to get user by ID with proper validation
export const getUserById = async (userId: string) => {
  try {
    // Input validation
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Mongoose connection not connected');

    const user = await db.collection('user').findOne(
      { $or: [{ id: userId }, { _id: userId }] },
      { projection: { _id: 1, id: 1, email: 1, name: 1 } }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id || user._id?.toString() || '',
      email: user.email,
      name: user.name
    };
  } catch (e) {
    console.error('getUserById error:', e);
    throw new Error('Failed to fetch user information');
  }
};