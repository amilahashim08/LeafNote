'use client';

import { Note } from '@/types';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import { MdPushPin } from 'react-icons/md';
import { formatDate, formatRelativeDate } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onTogglePin: (noteId: string, currentPinStatus: boolean) => void;
}

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      await onDelete(note._id);
    }
  };

  return (
    <div className={`relative flex flex-col bg-white rounded-xl transition-shadow shadow-lg hover:shadow-md p-4 h-full min-h-[140px]`}>
      {/* Left accent stripe */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl rounded-y-xl ${
          note.isPinned ? 'bg-green-500' : 'bg-transparent'
        }`
      }
      />

      {/* Pin (top-right small) */}
      <button
        onClick={() => onTogglePin(note._id, note.isPinned)}
        className={`absolute top-3 right-3 p-1 rounded text-md transition-colors ${
          note.isPinned ? 'text-green-600' : 'text-green-500 hover:text-gray-500'
        }`}
        title={note.isPinned ? 'Unpin note' : 'Pin note'}
        aria-pressed={note.isPinned}
      >
        <MdPushPin className="h-4 w-4" />
      </button>

      {/* Header */}
      <div className="mb-2">
        <h3 className={`text-lg font-semibold ${note.isPinned ? 'text-green-600' : 'text-primary'} mb-1`}>{note.title}</h3>
        <div className="flex items-center text-xs text-gray-400">
          <FiCalendar className="mr-2 h-3.5 w-3.5 text-gray-400" />
          <span>{formatRelativeDate(note.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 line-clamp-4 font-medium flex-1">{note.content}</p>

      {/* Footer: tag left, actions right */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => {
                const t = tag.trim().toLowerCase();
                const isComplete = ['complete', 'completed', 'done'].some((s) => t === s || t.includes(s));
                const isInProgress = ['in-progress', 'in progress', 'progress'].some((s) => t === s || t.includes(s));
                const isOverdue = ['overdue', 'due'].some((s) => t === s || t.includes(s));

                const className = isComplete
                  ? 'inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold'
                  : isInProgress
                  ? 'inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium border border-pink-200'
                  : isOverdue
                  ? 'inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-semibold'
                  : 'inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-sm font-medium';

                return (
                  <span key={index} className={className}>
                    #{tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="p-1 rounded text-green-400 hover:text-gray-700 transition-colors"
            title="Edit note"
            aria-label="Edit note"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded text-red-500 hover:text-red-500 transition-colors"
            title="Delete note"
            aria-label="Delete note"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


