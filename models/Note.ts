import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  // review metadata
  reviewed?: boolean;
  reviewedBy?: mongoose.Types.ObjectId | null;
  reviewedAt?: Date | null;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    // review metadata for admin
    reviewed: {
      type: Boolean,
      default: false,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', noteSchema);

export default Note;


