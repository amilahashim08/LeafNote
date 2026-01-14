import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { formatDistanceToNow, isWithinInterval, subDays, format } from 'date-fns';

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Format: "10th Oct 2025, 10:54 PM"
  const day = format(d, 'do'); // 10th, 11th, etc.
  const monthYear = format(d, 'MMM yyyy'); // Oct 2025
  const time = format(d, 'h:mm a'); // 10:54 PM
  
  return `${day} ${monthYear}, ${time}`;
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // If within last 7 days, show relative
  const now = new Date();
  const sevenDaysAgo = subDays(now, 7);

  const within7Days = isWithinInterval(d, { start: sevenDaysAgo, end: now });
  if (within7Days) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  return formatDate(d);
}


