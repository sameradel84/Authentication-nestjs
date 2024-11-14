/* eslint-disable prettier/prettier */

import * as bcrypt from 'bcrypt';

/**
 * Hashes a plaintext password using bcrypt.
 * 
 * @param password - The plaintext password to hash.
 * @returns The hashed password as a Promise<string>.
 */
export async function hashPassword(password: string): Promise<string> {
  // Hash the password with a salt rounds value of 10
  return bcrypt.hash(password, 10);
}

/**
 * Compares a plaintext password with a hashed password.
 * 
 * @param password - The plaintext password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A boolean indicating whether the passwords match.
 */
export async function comparePasswords(
  password: string,
  hash: string,
): Promise<boolean> {
  // Compare the plaintext password with the hash
  return bcrypt.compare(password, hash);
}
