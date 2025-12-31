import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import NotesPage from '@/components/NotesPage';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  return <NotesPage />;
}


