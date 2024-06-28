import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateChannelKeyMessage = (channleId: string) => {
  return `chat;${channleId};messages`;
};

export const generateChannelKeyMessageUpdate = (channleId: string) => {
  return `chat;${channleId};messages;update`;
};