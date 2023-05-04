<script>
	async function login() {}
	import '$lib/style/main.css';
</script>

<form class="form" on:submit={login}>
	<h1>find my enemy</h1>
	<input type="text" placeholder="username" />
	<input type="text" placeholder="password" />
	<div>
		<input type="checkbox" id="remember" />
		<label for="remember">Remember me</label>
	</div>
	<button type="submit">Sign in</button>
	<a href="/auth/register"> Don't have an account yet? Take the test! </a>
</form>

<!-- <style>
	form {
		margin: 0 calc(33.33vw - 8px);
		margin-top: 200px ;
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 1.5em;
	}
	
	button {
		border-radius: 20px;
		height: 40px;
		border: none;
	}

	input[type="text"] {
    padding: 30px;
    border: none; 
    border-radius: 16px;
    height: 40px;
    background-color: #201254;
    color: white; 
    }

    input[type="text"] ::placeholder{
    color: #E3DCFF; 
    }

    input[type="text"]::-webkit-input-placeholder {
    color: #E3DCFF;
    }
</style> -->
