<script lang="ts">
	import { req } from '$lib/core/api';
	import type { User } from '$lib/core/types';
	import { onMount } from 'svelte';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import Enemy from '$lib/components/Enemy.svelte';
	import FilerIcon from '$lib/images/filter-icon.svg';
	import toast from 'svelte-french-toast';

	let enemies: User[];

	async function getUsers() {
		try {
			enemies = await req('/users', 'GET', undefined, { frenemies: true });
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	onMount(async () => {
		await getUsers();
	});
</script>

<AccountButton />
<BackButton />

<div class="filter-button">
	<h1>Mortal Enemies</h1>
	<img src={FilerIcon} alt="Filter" />
</div>

<div class="grid-container">
	{#if enemies}
		{#each enemies as enemy}
			<Enemy {enemy} />
		{/each}
	{/if}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}

	.filter-button {
		display: flex;
		margin: var(--margin40);
		justify-content: space-between;
		align-items: center;
	}
</style>
