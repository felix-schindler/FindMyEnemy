<script>
	import logo from '$lib/images/svelte-logo.svg';
</script>

<header>
	<img src={logo} alt="SvelteKit" />
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	img {
		max-height: 3em;
	}
</style>
