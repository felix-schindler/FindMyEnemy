<script lang="ts">
	import { questions, type Question } from '$lib/data';
	import '$lib/style/main.css';
	import backButton from '$lib/images/back-icon.svg';

	let qIndex = 0;
	let question: Question = questions[qIndex];
	let answers: number[] = [];

	function addAnswer(index: number) {
		question = questions[++qIndex];
		answers = [...answers, index];
	}
</script>

<div class="persContainer">
	<div class="progress-bar" id="progressBar">
		<div class="progress" id="progress" style="width: {(qIndex * 100) / 35}%" />
	</div>
	<div class="display-number">
		<p>{qIndex}/35</p>
	</div>

	<div class="personality-test">
		<p>{question.question}</p>
		<ol>
			{#each question.answers as answer, index}
				<li>
					<button type="button" class="questionButton" on:click={() => addAnswer(index)}>
						{answer}
					</button>
				</li>
			{/each}
		</ol>
	</div>
	<div class="back-button">
		{#if qIndex > 0}
			<button
				type="button"
				class="reverseButton"
				on:click={() => {
					const newIndex = --qIndex;
					if (newIndex > -1) {
						question = questions[newIndex];
						answers.pop();
					}
				}}><img src={backButton} alt="Back" /></button
			>
		{/if}
	</div>
	<div class="finish-button">
		{#if qIndex === 34}
			<button class="mainBtn" on:click={() =>(window.location.href = '/result')}>
				<span>See Result</span>
			</button>
		{/if}
	</div>
</div>

<style>
	.persContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem auto;
		padding: 1rem;
	}
	ol {
		list-style: upper-latin;
	}

	.display-number {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1rem auto;
		padding: 1rem;
	}

	.personality-test {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2rem auto;
		padding: 1rem;
	}
	.back-button {
		display: flex;
		align-items: left;
		justify-content: left;
		margin: 1rem auto;
		margin-left: 0;
		padding: 1rem;
	}
</style>
