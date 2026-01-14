"use client";

import { useState, useEffect } from 'react';

interface UserItem {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  todaysCount: number;
  latestNote?: any;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (data.success) setUsers(data.data);
    setLoading(false);
  }

  async function fetchNotes(userId: string) {
    setLoading(true);
    setSelectedUserId(userId);
    const res = await fetch(`/api/admin/users/${userId}/notes`);
    const data = await res.json();
    if (data.success) setNotes(data.data);
    setLoading(false);
  }

  async function handleReview(noteId: string) {
    const res = await fetch(`/api/admin/notes/${noteId}/review`, { method: 'PUT' });
    const data = await res.json();
    if (data.success) {
      // refresh notes
      if (selectedUserId) await fetchNotes(selectedUserId);
      await fetchUsers();
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Admin - Users</h2>
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {users.map((u) => (
            <div key={u._id} className="p-4 border rounded mb-3 flex items-center justify-between">
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
                <div className="text-xs text-gray-400">Today: {u.todaysCount} — Last: {u.latestNote ? u.latestNote.title : '—'}</div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button onClick={() => fetchNotes(u._id)} className="px-3 py-1 bg-primary text-white rounded">View notes</button>
                <div className="text-xs text-gray-500">{u.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Notes</h3>
          {notes.length === 0 ? (
            <div className="text-gray-500">Select a user to view notes</div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <div key={n._id} className="p-3 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
                    <div className="text-sm mt-1">{n.content.slice(0,100)}{n.content.length>100?"...":""}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-sm ${n.reviewed? 'text-green-600':'text-gray-500'}`}>{n.reviewed ? 'Reviewed' : 'Pending'}</div>
                    {!n.reviewed && <button onClick={() => handleReview(n._id)} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Mark Reviewed</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}