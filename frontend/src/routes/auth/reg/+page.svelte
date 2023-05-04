<script>
	async function register() {}
</script>

<form on:submit={register}>
	<input type="email" placeholder="email" />
	<input type="text" placeholder="username" />
	<input type="password" placeholder="password" />
	<button type="submit">Sign up</button>
</form>
<a href="/auth">Already registered?</a>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
