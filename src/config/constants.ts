/* eslint-disable prettier/prettier */

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret';

export const COOKIE_OPTIONS = {
  httpOnly: true, // prevent xss attack
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const, // prevent csfr attack
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};


