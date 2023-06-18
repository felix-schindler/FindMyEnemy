<script>
	import backbutton from '$lib/images/left-cheveron.svg';
</script>

<div class="backBtnContainer">
	<!-- TODO: change on click to goto -->
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
		margin-left: 8%;
	}

	img {
		max-height: 1.5rem;
	}
</style>
