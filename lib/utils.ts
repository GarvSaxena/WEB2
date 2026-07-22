/**
 * lib/utils.ts — Shared utility functions
 */
import { clsx, type ClassValue } from "clsx";

/**
 * Merge Tailwind class names safely (handles conditional/falsy values).
 * Usage: cn("px-4", isActive && "bg-brand-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format a Date (or ISO string) into "Jan 12, 2024" */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Truncate a string to maxLen characters with an ellipsis */
export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? `${str.slice(0, maxLen)}…` : str;
}
