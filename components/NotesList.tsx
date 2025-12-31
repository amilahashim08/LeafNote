'use client';

import { Note } from '@/types';
import NoteCard from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onTogglePin: (noteId: string, currentPinStatus: boolean) => void;
}

export default function NotesList({ notes, onEdit, onDelete, onTogglePin }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="mb-4 relative">
          <div className="w-32 h-32 bg-primary-light rounded-lg flex items-center justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">+</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">Nothing here yet</h3>
        <p className="text-gray-600 text-center max-w-md">
          Start creating your first note! Click the &apos;Add&apos; button to jot down your
          thoughts, ideas, and reminders. Let&apos;s get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}


