<script>
	import accountButton from '$lib/images/account.svg';
</script>

<div class="accountBtnContainer">
	<a class="account-button" href="/account">
		<img src={accountButton} alt="Account Button" />
	</a>
</div>

<style>
	img {
		height: 3rem;
		width: 3rem;
	}

	a {
		position: fixed;
		top: 5%;
		right: 1.5rem;
		transform: translateY(-50%);
		cursor: pointer;
		border-radius: 100%;
	}
</style>
