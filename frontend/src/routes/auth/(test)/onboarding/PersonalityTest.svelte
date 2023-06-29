<script lang="ts">
	import backButton from '$lib/images/back-icon.svg';

	import { onMount } from 'svelte';
	import { req } from '$lib/core/api';
	import type { Question, UserAnswer, Category } from '$lib/core/types';
	import toast from 'svelte-french-toast';

	export let personality: string;

	let questions: Question[] = [];
	let qIndex = 0;
	let question: Question;
	let answers: UserAnswer[] = [];
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
		if (qIndex === 35) {
			await getPersonality();
		}
	}

	async function getQuestions() {
		try {
			questions = await req('/questions', 'GET');
			question = questions[qIndex];
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	async function getPersonality() {
		try {
			personality = (await req('/questions/personality', 'POST', answers)).personality;
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	onMount(async () => {
		await getQuestions();
	});
</script>

<div class="persContainer">
	<div class="progress-bar">
		<div class="progress" style="width: {(qIndex * 100) / 35}%" />
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
		{#if qIndex > 0}
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
		{/if}
	{:else}
		<div />
	{/if}
</div>

<style>
	div.persContainer {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: center;

		height: 100%;
		text-align: center;
	}

	.progress-bar,
	.personality-test,
	.back-button {
		margin: 1rem auto;
	}

	.personality-test > p {
		font-size: larger;
		font-weight: 500;
	}

	ol {
		list-style: upper-latin;
	}

	.back-button {
		margin-left: 0;
	}

	.reverseButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
		cursor: pointer;
	}
</style>
