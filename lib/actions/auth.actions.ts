'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

// Input validation functions
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): boolean {
  // Password should be at least 8 characters
  return typeof password === 'string' && password.length >= 8;
}

function validateName(name: string): boolean {
  return typeof name === 'string' && name.length >= 1 && name.length <= 50;
}

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        // Input validation
        if (!validateEmail(email)) {
            return { success: false, error: 'Invalid email address' };
        }

        if (!validatePassword(password)) {
            return { success: false, error: 'Password must be at least 8 characters long' };
        }

        if (!validateName(fullName)) {
            return { success: false, error: 'Invalid name' };
        }

        if (typeof country !== 'string' || country.length === 0) {
            return { success: false, error: 'Country is required' };
        }

        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        if(response) {
            await inngest.send({
                name: 'app/user.created',
                data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
            })
        }

        return { success: true, data: response }
    } catch (e: any) {
        console.log('Sign up failed', e)
        // Return a generic error message to avoid leaking system information
        return { success: false, error: 'Unable to complete sign up. Please try again.' }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        // Input validation
        if (!validateEmail(email)) {
            return { success: false, error: 'Invalid email address' };
        }

        if (!validatePassword(password)) {
            return { success: false, error: 'Invalid password' };
        }

        const response = await auth.api.signInEmail({ body: { email, password } });
        
        if (!response) {
            return { success: false, error: 'Invalid credentials' };
        }

        return { success: true, data: response };
    } catch (e: any) {
        console.log('Sign in failed', e);
        // Return a generic error message to avoid leaking system information
        return { success: false, error: 'Unable to sign in. Please check your credentials and try again.' };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut();
        return { success: true };
    } catch (e: any) {
        console.log('Sign out failed', e);
        // Even if sign out fails, we can still redirect the user
        return { success: true }; // Still return success to allow client to redirect
    }
}