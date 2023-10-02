import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (func: Function) => {
  let timeOut: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func(...args);
    }, 800);
  };
};
