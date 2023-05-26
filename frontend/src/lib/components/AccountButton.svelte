<script>
	import accountButton from '$lib/images/account.svg';
</script>

<div class="accountBtnContainer">
	<button
		class="account-button"
		on:click={() => {
			window.location.href = '/account';
		}}
	>
		<img src={accountButton} alt="Account Button" />
	</button>
</div>

<style>
	img {
		height: 3rem;
		width: 3rem;
	}

	button {
		position: fixed;
		top: 5%;
		right: 1.5rem;
		transform: translateY(-50%);
		cursor: pointer;
		border-radius: 100%;
	}
</style>
