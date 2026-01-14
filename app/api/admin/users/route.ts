import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Note from '@/models/Note';
import { getUserFromRequest } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const currentUser = await getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const users = await User.find().select('_id name email createdAt role').lean();

    // For each user compute today's note count and last update
    const results = await Promise.all(users.map(async (user) => {
      const startOfDay = new Date();
      startOfDay.setHours(0,0,0,0);

      const todaysCount = await Note.countDocuments({ userId: user._id, createdAt: { $gte: startOfDay } });
      const latestNote = await Note.findOne({ userId: user._id }).sort({ createdAt: -1 }).lean();

      return {
        ...user,
        todaysCount,
        latestNote: latestNote ? { _id: latestNote._id, title: latestNote.title, createdAt: latestNote.createdAt, reviewed: latestNote.reviewed } : null,
      };
    }));

    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch users' }, { status: 500 });
  }
}