import { persist } from 'svelte-local-storage-store';
import type { AuthUser } from './types';

/**
 * Auth store (undefined if not logged in)
 */
export const authStore = persist<AuthUser>("auth", undefined);
