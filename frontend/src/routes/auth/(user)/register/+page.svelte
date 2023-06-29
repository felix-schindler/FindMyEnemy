<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { authStore } from '$lib/core/stores';
	import { req } from '$lib/core/api';
	import toast from 'svelte-french-toast';

	const next = $page.url.searchParams.get('next');
	const personality = $page.url.searchParams.get('personality') ?? '';
	let username = '',
		password = '',
		rPassword = '',
		errorMessage = '';

	async function register() {
		// Check if password match
		if (password == rPassword) {
			try {
				const res = await req('/users', 'POST', { username, password, personality });
				$authStore = res;
				await goto(next ?? '/');
				return;
			} catch (e: any) {
				toast.error(e.message);
			}
		} else {
			toast.error('Passwords do not match');
		}
	}
</script>

<form class="form" on:submit={register}>
	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}
	<input type="text" autocomplete="username" placeholder="username" bind:value={username} />
	<input type="password" autocomplete="new-password" placeholder="password" bind:value={password} />
	<input
		type="password"
		autocomplete="new-password"
		placeholder="repeat password"
		bind:value={rPassword}
	/>
	<button type="submit" class="mainBtn" disabled={!personality}>
		<span>Sign Up</span>
	</button>
	<a href="/auth">Already registered?</a>
</form>

<style>
	a {
		justify-content: center;
		text-align: center;
		color: #e3dcff;
	}
</style>
