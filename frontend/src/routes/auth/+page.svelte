<script>
	async function login() {}
	import '$lib/style/main.css';
</script>

<main>
<div class="helpp">
<form class="form" on:submit={login}>
	<input type="text" placeholder="username" />
	<input type="password" placeholder="password" />
	<div class="abc">
		<input type="checkbox" id="remember" style="margin-right: 10px;" />
		<label for="remember">Remember me</label>
	</div>
	<button type="submit" class="mainBtn">
		<span>Sign in</span>
	</button>
	<a href="/auth/register" > Don't have an account yet? <b>Take the test! </b>
	</a>
</form>
</div>
</main>


<style>
	a {
		justify-content: center;
		text-align: center; 
		color: #E3DCFF;
	}

	.abc {
 	display: flex;
  	align-items: center;
	}

	.helpp {
	 margin: 0px;
	}

</style> 
