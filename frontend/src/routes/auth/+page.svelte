<script>
	import { goto } from '$app/navigation';

	import { req } from '$lib/core/api';
	import { authStore } from '$lib/core/stores';
	import { Status } from '$lib/core/types';

	let username = '',
		password = '';
	let msg = '';

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
			await goto("/");
		}
	}
</script>

<form on:submit={login}>
	<input type="text" placeholder="username" bind:value={username} />
	<input type="password" placeholder="password" bind:value={password} />
	<div>
		<input type="checkbox" id="remember" />
		<label for="remember">Remember me</label>
	</div>
	<button type="submit">Sign in</button>
</form>
<a href="/auth/reg">Don't have an account yet?</a>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
