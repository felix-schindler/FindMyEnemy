<script lang="ts">
	import { Status, type Question, type UserAnswer, type Category } from '$lib/core/types';
	import '$lib/style/main.css';
	import backButton from '$lib/images/back-icon.svg';
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';

	let questions: Question[] = [];
	let qIndex = 0;
	let question: Question;
	let answers: UserAnswer[] = [];
	let personality: string;
	let msg = '';

	async function addAnswer(qId: number, category: Category) {
		question = questions[++qIndex];
		answers = [
			...answers,
			{
				question_id: qId,
				category: category
			}
		];

		// Get personality as soon as user is finished answering questions
		console.log(qIndex);
		if (qIndex === 35) {
			await getPersonality();
		}
	}

	async function getQuestions() {
		const res = await req('/questions', 'GET');

		if (res instanceof Status) {
			msg = `${res.status}: ${res.message}`;
		} else {
			//Set questions
			questions = res;
			question = questions[qIndex];
		}
	}

	async function getPersonality() {
		const res = await req('/questions/personality', 'POST', answers);

		// Check for error -> show message ; else: set personality
		if (res instanceof Status) {
			msg = `${res.status}: ${res.message}`;
		} else {
			personality = res.personality;
		}
	}

	onMount(async () => {
		await getQuestions();
	});
</script>

<div class="persContainer">
	<div class="progress-bar" id="progressBar">
		<div class="progress" id="progress" style="width: {(qIndex * 100) / 35}%" />
	</div>
	<div class="display-number">
		<p>{qIndex}/35</p>
	</div>

	{#if question}
		<div class="personality-test">
			<p>{question.content}</p>
			<ol>
				{#each question.answers as answer}
					<li>
						<button
							type="button"
							class="questionButton"
							on:click={() => addAnswer(question.id, answer.category)}
						>
							{answer.content}
						</button>
					</li>
				{/each}
			</ol>
		</div>
	{:else if qIndex > 0}
		<div class="back-button">
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
		</div>
		{#if qIndex === 35}
			<div class="finish-button">
				<p>You are: {personality}</p>
				<a href="/auth/register?personality={encodeURIComponent(personality)}" class="mainBtn"
					>See Result</a
				>
			</div>
		{/if}
	{/if}
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
