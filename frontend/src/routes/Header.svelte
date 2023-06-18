<script>
	import logo from '$lib/images/findmyenemy-logo.svg';
	import { goto } from '$app/navigation';
</script>

<header>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img src={logo} alt="FindMyEnemy" class="logo" on:click={() => goto('/homepage')} />
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	img {
		max-height: 3rem;
	}

	.logo {
		margin: 1rem;
	}
</style>
