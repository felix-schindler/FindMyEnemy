<script>
	async function login() {}
</script>

<form on:submit={login}>
	<input type="text" placeholder="username" />
	<input type="password" placeholder="password" />
	<div>
		<input type="checkbox" id="remember" />
		<label for="remember">Remember me</label>
	</div>
	<button type="submit">Sign in</button>
</form>
<a href="/auth/reg">Don't have an account yet?</a>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
