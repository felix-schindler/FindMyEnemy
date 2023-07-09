<script lang="ts">
	import { toast } from 'svelte-french-toast';

	import { req } from '$lib/core/api';
	import type { User } from '$lib/core/types';
	import { authStore } from '$lib/core/stores';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import DiscoverEnemy from '$lib/components/DiscoverEnemy.svelte';
	import ChevronRight from '$lib/images/moredetails.svg';

	let search: string;

	let topEnemies: User[];
	let mortalEnemies: User[];

	// Get users whenever the search query changes
	$: void getUsers(search);

	/**
	 * Load top and mortal enemies from the backend
	 * @param search
	 */
	async function getUsers(search: string) {
		let query = {};

		if (search) {
			query = { q: search };
		}

		try {
			topEnemies = await req('/users', 'GET', undefined, query);
		} catch (e: any) {
			toast.error(`Failed to load top enemies ${e.message}`);
		}

		try {
			mortalEnemies = await req('/users', 'GET', undefined, { frenemies: true, ...query });
		} catch (e: any) {
			toast.error(`Failed to load mortal enemies ${e.message}`);
		}
	}
</script>

<main>
	<AccountButton />

	<div class="searchBar">
		<div class="search-bar-container">
			<input type="search" class="search-bar" placeholder="Search..." bind:value={search} />
		</div>
	</div>

	<div class="top-enemies">
		<h1>Hi {$authStore.username}</h1>
		<a href="/top-enemies" class="moredetails-button">
			<h2>Discover top enemies</h2>
			<img src={ChevronRight} class="moredetails-icon" alt="Back" />
		</a>

		<div>
			<div class="grid-container">
				{#if topEnemies}
					{#if topEnemies.length > 0}
						{#each topEnemies as user}
							<DiscoverEnemy {user} />
						{/each}
					{:else}
						<p>No enemies found</p>
					{/if}
				{:else}
					<p>Loading...</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="top-enemies">
		<a href="/mortal-enemies" class="moredetails-button">
			<h2>Discover mortal enemies</h2>
			<img src={ChevronRight} class="moredetails-icon" alt="Back" />
		</a>

		<div class="grid-container">
			{#if mortalEnemies}
				{#if mortalEnemies.length > 0}
					{#each mortalEnemies as user}
						<DiscoverEnemy {user} />
					{/each}
				{:else}
					<p>No enemies found</p>
				{/if}
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>
</main>

<style>
	h1 {
		margin-block: var(--margin40);
	}

	.moredetails-button {
		margin-block-start: var(--margin20);
	}

	a {
		text-decoration: none;
		color: var(--text-color);
	}

	.searchBar {
		display: flex;
		justify-content: center;
	}

	.search-bar-container {
		position: relative;
		justify-content: space-between;
	}

	.search-bar {
		width: 80vw;
		height: 20px;
		padding-right: var(--padding);
	}

	.grid-container {
		display: flex;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: var(--margin20);
		padding-top: var(--margin20);
		padding-bottom: var(--margin20);
		overflow-x: auto;
	}

	@media (min-width: 768px) {
		.grid-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			overflow-x: auto;
		}
	}

	.moredetails-button {
		display: flex;
		align-items: center;
		gap: 2rem;
	}
</style>
