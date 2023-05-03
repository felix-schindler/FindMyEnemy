<script>
	import Header from './Header.svelte';
	import '$lib/style/main.css';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		background: var(--background-gradient);
		display: grid;
		grid-template-rows: auto 1fr;
		min-height: 100vh;
	}
	
</style>
