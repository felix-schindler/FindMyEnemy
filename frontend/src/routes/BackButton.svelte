<script>
	import backbutton from '$lib/images/left-cheveron.svg';
</script>

<div class="backBtnContainer">
	<button
		class="back-button"
		on:click={() => {
			window.history.back();
		}}
	>
		<img src={backbutton} alt="Back" />
	</button>
</div>

<style>
	.backBtnContainer {
		margin-left: 6rem;
	}

	img {
		max-height: 1.5rem;
	}
</style>
