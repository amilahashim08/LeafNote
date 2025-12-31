'use client';

import { Note } from '@/types';
import { FiPin, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

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
    <div
      className={`bg-white rounded-lg border-l-4 ${
        note.isPinned ? 'border-primary-dark' : 'border-primary-light'
      } shadow-md hover:shadow-lg transition-shadow p-4`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary mb-1">{note.title}</h3>
          <p className="text-xs text-gray-500">
            {formatDate(note.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onTogglePin(note._id, note.isPinned)}
            className={`p-2 rounded-lg transition-colors ${
              note.isPinned
                ? 'text-primary-dark bg-accent'
                : 'text-gray-400 hover:text-primary hover:bg-accent-light'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <FiPin className={`h-5 w-5 ${note.isPinned ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-accent-light transition-colors"
            title="Edit note"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete note"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-3 line-clamp-3">{note.content}</p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}


