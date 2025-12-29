import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * Useful for conditionally applying Tailwind CSS classes.
 *
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
