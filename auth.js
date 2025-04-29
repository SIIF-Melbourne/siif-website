import { supabase } from './supabaseClient';

// Function to sign up a new user
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return null;
  }

  console.log('User signed up:', data);
  return data;
}

// Function to sign in an existing user
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return null;
  }

  console.log('User signed in:', data);
  return data;
}

// Function to get the currently authenticated user
export async function getUser() {
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }

  return user;
}

// Function to sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return false;
  }

  console.log('User signed out successfully');
  return true;
}