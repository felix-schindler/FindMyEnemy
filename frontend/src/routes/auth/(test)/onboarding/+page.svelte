<script lang="ts">
	import PersonalityTest from './PersonalityTest.svelte';
	import QuestionaireResult from './QuestionaireResult.svelte';
	import NextIcon from '$lib/images/next-icon.svg';

	let screen = 1,
		personality: string;

	function handleNext() {
		screen++;
	}
</script>

{#if personality}
	<QuestionaireResult {personality} />
{:else if screen === 1}
	<div class="layout">
		<div>
			<p>Find your enemies before they find you</p>
			<h1>find my <br /> enemy</h1>
			<button class="mainBtn" on:click={handleNext}>
				<img src={NextIcon} alt="Next" />
			</button>
		</div>
	</div>
{:else if screen === 2}
	<div class="layout">
		<div>
			<h1>First, let us test your personality</h1>
			<p>Based on the result, we will help you find your worst enemies.</p>
			<button class="mainBtn" on:click={handleNext}>
				<span>Start test</span>
			</button>
		</div>
	</div>
{:else if screen === 3}
	<PersonalityTest bind:personality />
{/if}

<style>
	div.layout {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: end;
	}

	@media (min-width: 768px) {
		div {
			width: 20%;
			margin-top: 100px;
			display: flex;
			flex-direction: column;
			gap: 15px;
		}
	}

	div button {
		margin-top: 20px;
		margin-left: 0;
	}
</style>
