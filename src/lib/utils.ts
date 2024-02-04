import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Function to combine class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Other utility functions can be added below
