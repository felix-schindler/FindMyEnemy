<script lang="ts">
	import '$lib/style/main.css';

	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	import { authStore } from '$lib/core/stores';

	import { Toaster } from 'svelte-french-toast';
	import Header from './Header.svelte';

	let path: string;
	$: path = $page.url.pathname;

	$: if (!$authStore && !path.startsWith('/auth')) {
		const redir = '/auth?next=' + encodeURIComponent(path);
		if (browser) goto(redir);
		else redirect(307, redir);
	}
</script>

<Toaster />
<div class="app">
	<Header />
	<main>
		{#if $authStore || path.startsWith('/auth')}
			<slot />
		{/if}
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr;

		color: var(--text-icon);
		background: var(--background-gradient);

		font-family: 'Rubik', sans-serif;
		font-style: normal;

		min-height: 100vh;
		padding: 2em;
	}
</style>
