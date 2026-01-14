import AdminUsers from '@/components/AdminUsers';

export const metadata = {
  title: 'Admin - Users',
};

export default function AdminPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Portal</h1>
      <AdminUsers />
    </main>
  );
}
