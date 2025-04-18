import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Function to merge Tailwind classes properly
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}