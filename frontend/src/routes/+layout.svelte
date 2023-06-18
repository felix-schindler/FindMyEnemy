<script>
	import Header from './Header.svelte';
	import '$lib/style/main.css';
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
