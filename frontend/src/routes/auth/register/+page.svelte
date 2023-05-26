<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import '$lib/style/main.css';
	import abc from '$lib/images/userlogin-icon.svg';
	import { authStore } from '$lib/core/stores';

	const next = $page.url.searchParams.get("next");

	$: if ($authStore) {
		goto(next ?? "/");
	}

	async function register() {}
</script>

<form class="form" on:submit={register}>
	<input type="text" placeholder="username" />
	<input type="password" placeholder="password" />
	<input type="password" placeholder="repeat password" />
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
