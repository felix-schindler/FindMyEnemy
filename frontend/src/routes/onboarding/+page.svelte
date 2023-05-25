<script>
	let screen = 1;

	function handleNext() {
		screen++;
	}
</script>

{#if screen === 1}
	<div>
		<p>Find your enemies before they find you</p>
		<h1>find my <br /> enemy</h1>
		<button class="mainBtn" on:click={handleNext}
			><span><img src="/src/lib/images/next-icon.svg" alt="Next" /></span></button
		>
	</div>
{/if}

{#if screen === 2}
	<div>
		<h1>First, let us test your personality</h1>
		<p>Based on the result, we will help you find your worst enemies.</p>
		<button class="mainBtn" on:click={() => (window.location.href = '/personality-test')}
			><span>Start test</span></button
		>
	</div>
{/if}

<style>
	div {
		width: 20%;
		margin: 0 auto;
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	div button {
		margin-top: 20px;
		margin-left: 0;
	}
</style>
