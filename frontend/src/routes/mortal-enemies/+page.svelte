<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { req } from '$lib/core/api';
	import Enemy from '$lib/components/Enemy.svelte';
	import { Status, type User } from '$lib/core/types';

	// let enemies: User[];

	// async function getUsers() {
	// 	const res = await req('/users', "GET");

	// 	if (res instanceof Status) {
	// 		console.error(res);
	// 	} else {
	// 		enemies = res
	// 	}
	// }

	let enemies = [
		{
			id: 1,
			title: 'Timothy',
			personality: 'ENFJ',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 2,
			title: 'Benjamin',
			personality: 'ENFP',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 3,
			title: 'Natasha',
			personality: 'INFJ',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 4,
			title: 'Anna',
			personality: 'ISTP',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 5,
			title: 'Kylie',
			personality: 'ESFP',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 6,
			title: 'Dan',
			personality: 'ISTJ',
			compatibility: '89%',
			description: '12km'
		}
	];
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<main>
	<AccountButton />
	<BackButton />

	<div class="enemies-list">
		<div class="filter-button">
			<h1>Top Enemies</h1>
			<span class="filter-icon" />
		</div>

		<div class="grid-container">
			{#each enemies as enemy (enemy.id)}
				<Enemy {enemy} />
			{/each}
		</div>
	</div>
</main>


