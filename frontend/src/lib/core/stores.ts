import { persisted } from 'svelte-local-storage-store';
import type { AuthUser } from './types';

/**
 * Auth store (undefined if not logged in)
 */
// @ts-ignore Needs to be undefined in the beginning
export const authStore = persisted<AuthUser>("auth", undefined);
