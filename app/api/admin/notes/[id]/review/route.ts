import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Note from '@/models/Note';
import { getUserFromRequest } from '@/lib/auth';
import mongoose from 'mongoose';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await dbConnect();

    const currentUser = await getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid note ID' }, { status: 400 });
    }

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    note.reviewed = true;
    note.reviewedBy = currentUser._id;
    note.reviewedAt = new Date();

    await note.save();

    return NextResponse.json({ success: true, data: note });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to review note' }, { status: 500 });
  }
}