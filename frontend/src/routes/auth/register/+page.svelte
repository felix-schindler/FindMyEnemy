<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import '$lib/style/main.css';
	import { authStore } from '$lib/core/stores';
	import { req } from '$lib/core/api';
	import { Status } from '$lib/core/types';
	import { onMount } from 'svelte';

	const next = $page.url.searchParams.get('next');
	const personality = $page.url.searchParams.get('personality') ?? '';
	let username = '',
		password = '',
		rPassword = '';

	async function register() {
		// Check if password match
		if (password == rPassword) {
			const res = await req('/users', 'POST', { username, password, personality });

			if (res instanceof Status) {
				// TODO: Show error message as toast or sth
				console.error(res);
			} else {
				$authStore = res;
				await goto(next ?? '/');
			}
		} else {
			// TODO: Show error
		}
	}
</script>

<h1>find my <br /> enemy</h1>
<form class="form" on:submit={register}>
	<input type="text" placeholder="username" bind:value={username} />
	<input type="password" placeholder="password" bind:value={password} />
	<input type="password" placeholder="repeat password" bind:value={rPassword} />
	<button type="submit" class="mainBtn">
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
