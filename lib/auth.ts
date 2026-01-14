import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getUserIdFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) return null;
  
  const payload = verifyToken(token);
  return payload?.userId || null;
}

export async function getUserFromRequest(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return null;
  await dbConnect();
  const user = await User.findById(userId).select('+role');
  return user;
}

export async function isUserAdmin(request: NextRequest) {
  const user = await getUserFromRequest(request);
  return !!user && (user.role === 'admin');
}


