import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Note from '@/models/Note';
import { getUserFromRequest } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await dbConnect();

    const currentUser = await getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 });
    }

    const notes = await Note.find({ userId: id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch notes' }, { status: 500 });
  }
}