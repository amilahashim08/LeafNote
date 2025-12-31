import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LeafNote - Your Note Taking App',
  description: 'A modern note-taking application with CRUD operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-accent-light">{children}</body>
    </html>
  );
}


