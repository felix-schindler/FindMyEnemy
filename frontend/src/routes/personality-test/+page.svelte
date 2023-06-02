<script lang="ts">
	import { Status, type Question, type UserAnswer, type Category } from '$lib/core/types';
	import '$lib/style/main.css';
	import backButton from '$lib/images/back-icon.svg';
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';
	import '$lib/style/personality.css';

	let questions: Question[] = [];
	let qIndex = 0;
	let question: Question;
	let answers: UserAnswer[] = [];
	let personality: string;

	function addAnswer(qId: number, category: Category) {
		question = questions[++qIndex];
		answers = [
			...answers,
			{
				question_id: qId,
				category: category
			}
		];
	}

	async function getQuestions() {
		const res = await req('/questions', 'GET');

		if (res instanceof Status) {
			// TODO: Show error
			console.error(res);
		} else {
			// TODO: Set questions
			questions = res;
			question = questions[qIndex];
		}
	}

	async function getPersonality() {
		const res = await req('/questions/personality', 'POST', answers);

		// TODO: Check for error -> show message ; else: set personality
		if (res instanceof Status) {
			console.error(res);
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
			{#if qIndex === 35}
				<a href="/auth/register?personality={encodeURIComponent(personality)}" class="mainBtn"
					>See Result</a
				>
			{/if}
		</div>
	{/if}
</div>
