import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Format: "10th Oct 2025, 10:54 PM"
  const day = format(d, 'do'); // 10th, 11th, etc.
  const monthYear = format(d, 'MMM yyyy'); // Oct 2025
  const time = format(d, 'h:mm a'); // 10:54 PM
  
  return `${day} ${monthYear}, ${time}`;
}


