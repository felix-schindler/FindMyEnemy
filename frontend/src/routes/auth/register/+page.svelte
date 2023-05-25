<script>
	async function register() {}
	import '$lib/style/main.css';
	import abc from '$lib/images/userlogin-icon.svg';
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
