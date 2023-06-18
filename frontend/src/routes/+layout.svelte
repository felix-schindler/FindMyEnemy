<script>
	import '$lib/style/main.css';
	import Header from './Header.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<div class="app">
	<Header />
	<main>
		<slot />
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
