import { writable } from 'svelte/store';
import type { AuthUser } from './types';

/**
 * Auth store (undefined if not logged in)
 */
export const authStore = writable<AuthUser>();
