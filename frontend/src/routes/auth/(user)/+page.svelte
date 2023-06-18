<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { req } from '$lib/core/api';
	import { authStore } from '$lib/core/stores';
	import { Status } from '$lib/core/types';

	let username = '',
		password = '';
	let msg = '';

	const next = $page.url.searchParams.get('next');

	async function login() {
		const res = await req('/users/login', 'POST', {
			username,
			password
		});

		if (res instanceof Status) {
			// Error occured, show message
			msg = `${res.status}: ${res.message}`;
		} else {
			// Login successful, set user and redirect
			$authStore = res;
			await goto(next ?? '/');
		}
	}
</script>

<form class="form" on:submit={login}>
	{#if msg}
		<p class="error-message">{msg}</p>
	{/if}
	<input type="text" autocomplete="username" placeholder="username" bind:value={username} />
	<input
		type="password"
		autocomplete="current-password"
		placeholder="password"
		bind:value={password}
	/>
	<div class="il">
		<input type="checkbox" id="remember" />
		<label for="remember">Remember me</label>
	</div>
	<button type="submit" class="mainBtn">
		<span>Sign In</span>
	</button>
	<a href="/auth/onboarding">Don't have an account yet? <b>Take the test!</b></a>
</form>

<style>
	a {
		font-weight: normal;
		text-decoration: none;
		color: #e3dcff;
	}

	div.il {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: start;
	}
</style>
