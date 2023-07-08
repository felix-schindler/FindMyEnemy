<script lang="ts">
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import ChallengeResult from './ChallengeResult.svelte';
	import type { Challenge } from '$lib/core/types';
	import { toast } from 'svelte-french-toast';

	let challenges: Challenge[];

	async function getChallenges() {
		try {
			challenges = await req('/challenges', 'GET');
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	onMount(async () => {
		getChallenges();
	});
</script>

<div>
	<div>
		<AccountButton />
		<BackButton />
	</div>

	<h1>Challenge History</h1>
	<div class="container">
		{#if !challenges}
			<p>Loading...</p>
		{:else if challenges.length == 0}
			<p>No challenges yet</p>
		{:else}
			{#each challenges as challenge}
				<ChallengeResult {challenge} />
			{/each}
		{/if}
	</div>
</div>

<style>
	h1 {
		text-align: left;
		margin: var(--fs-title);
		margin-left: var(--margin40);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: large;
	}
</style>
