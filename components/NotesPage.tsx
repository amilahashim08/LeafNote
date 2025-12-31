'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from './TopNav';
import NotesList from './NotesList';
import NoteDialog from './NoteDialog';
import { Note, NoteFormData } from '@/types';
import { FiPlus } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.success && data.data) {
        const user = data.data;
        setUserName(user.name || 'User');
        const initials = user.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
        // Store in localStorage for quick access
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Fallback to localStorage if API fails
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name || 'User');
          const initials = user.name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
          setUserInitials(initials);
        } else {
          setUserName('User');
          setUserInitials('U');
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Fallback to localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || 'User');
        const initials = user.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
      } else {
        setUserName('User');
        setUserInitials('U');
      }
    }
  };

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/notes');
      const data = await response.json();

      if (data.success) {
        setNotes(data.data || []);
        setFilteredNotes(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsDialogOpen(true);
  };

  const handleSaveNote = async (formData: NoteFormData) => {
    try {
      const url = editingNote ? `/api/notes/${editingNote._id}` : '/api/notes';
      const method = editingNote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchNotes();
      } else {
        throw new Error(data.error || 'Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchNotes();
      } else {
        throw new Error(data.error || 'Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleTogglePin = async (noteId: string, currentPinStatus: boolean) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPinned: !currentPinStatus }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchNotes();
      } else {
        throw new Error(data.error || 'Failed to update note');
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-light to-white">
      <TopNav
        onSearch={handleSearch}
        userName={userName}
        userInitials={userInitials}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center mb-6">
          <FiMenu className="h-6 w-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary pb-2">
            My Notes
          </h2>
        </div>

        {/* Notes List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <NotesList
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}

        {/* Add Note Button */}
        <button
          onClick={handleAddNote}
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center z-30"
          title="Add new note"
        >
          <FiPlus className="h-6 w-6" />
        </button>
      </main>

      {/* Note Dialog */}
      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
}


