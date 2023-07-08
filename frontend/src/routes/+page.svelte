<script lang="ts">
	import { onMount } from 'svelte';
	import { req } from '$lib/core/api';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import DiscoverEnemy from '$lib/components/DiscoverEnemy.svelte';
	import ChevronRight from '$lib/images/moredetails.svg';
	import SearchResults from './SearchResults.svelte';

	import type { User } from '$lib/core/types';
	import { authStore } from '$lib/core/stores';
	import toast from 'svelte-french-toast';
	let query = '';
  	let searchResults: User[];

	let topEnemies: User[];
	let mortalEnemies: User[];

	async function getUsers() {
		try {
			let topEnemiesRes = await req('/users', 'GET');
			topEnemies = topEnemiesRes.slice(0, 6);
		} catch (e: any) {
			toast.error(`Failed to load top enemies ${e.message}`);
		}

		try {
			let mortalEnemiesRes = await req('/users', 'GET', undefined, { frenemies: true });
			mortalEnemies = mortalEnemiesRes.slice(-6);
		} catch (e: any) {
			toast.error(`Failed to load mortal enemies ${e.message}`);
		}
	}

	onMount(async () => {
		await getUsers();
	});

	
	async function search() {
  	searchResults = topEnemies.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
	}

</script>

<main>
	<AccountButton />

	<div class="searchBar">
		<div class="search-bar-container">
		  <input type="search" class="search-bar" placeholder="Search..." bind:value={query} />
	
		  <button type="button" class="search-button" on:click={search}>
			<img src="/src/lib/images/search-icon.svg" alt="Search" />
		  </button>

		</div>
	</div>
	  

	{#if searchResults && searchResults.length > 0}
    <SearchResults query={query} searchedUsers={searchResults} />
  	{:else}
	<div class="top-enemies">
		<h1>Hi {$authStore.username}</h1>
		<a href="/top-enemies" class="moredetails-button">
			<h2>Discover top enemies</h2>
			<img src={ChevronRight} class="moredetails-icon" alt="Back" />
		</a>

		<div style="overflow-x: auto;">
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

	{/if} 
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

	.search-button {
	background: transparent;
	border: none;
	position: absolute;
	appearance: none;
	top: 50%;
	right: var(--margin40);
	transform: translateY(-50%);
	}


	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: var(--margin20);
		padding-top: var(--margin20);
		padding-bottom: var(--margin20);
	}

	@media (min-width: 768px) {
		.grid-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}

	.moredetails-button {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	/* .moredetails-icon img {
		width: 8px;
		height: 12px;
		// margin-left: var(--margin20);
	} */
</style>
