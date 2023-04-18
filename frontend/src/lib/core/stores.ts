import { writable } from 'svelte/store';
import type { AuthRecord } from './types';

/**
 * Auth store (undefined if not logged in)
 */
export const authStore = writable<AuthRecord>();
