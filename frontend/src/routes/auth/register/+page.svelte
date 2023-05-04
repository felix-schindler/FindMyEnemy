<script>
	async function register() {}
	import '$lib/style/main.css';
</script>

<form class="form" on:submit={register}>
	<h1>find my enemy</h1>
	<input type="text" placeholder="email" />
	<input type="text" placeholder="username" />
	<input type="text" placeholder="password" />
	<button type="submit">Sign Up</button>
	<a href="/auth">Already registered?</a>
</form>

 <style>
	/* form {
		 display: flex;
		flex-direction: column;
		gap: 1em; 
	} */
</style>
