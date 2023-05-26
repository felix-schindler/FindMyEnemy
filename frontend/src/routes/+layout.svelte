<script>
	import Header from './Header.svelte';
	import '$lib/style/main.css';
	import { page } from '$app/stores';
	import { authStore } from '$lib/core/stores';
	import { goto } from '$app/navigation';

	const AUTH_URL = "/auth";

	$: if (!$page.url.pathname.startsWith(AUTH_URL) && !$authStore) {
		goto(`/auth?next=${encodeURIComponent($page.url.pathname)}`);
	}
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,700&display=swap');
	.app {
		background: var(--background-gradient);
		color: var(--text-icon);
		display: grid;
		font-family: 'Rubik', sans-serif;
		font-weight: 700;
		font-style: normal;
		/*font-family: var(--font-family);
		font-weight: var(--fw-bold);*/
		grid-template-rows: auto 1fr;
		min-height: 100vh;
	}
</style>
