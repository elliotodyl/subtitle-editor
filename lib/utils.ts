import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as uuid from "uuid";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// >>>>>>>>>>>>>>>>>>>>>Generate ID<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export function getUUIDString(): string {
	return uuid.v4().replace(/-/g, "");
}
export function getNanoId(length?: number): string {
	if (length) return nanoid(length);
	return nanoid();
}
