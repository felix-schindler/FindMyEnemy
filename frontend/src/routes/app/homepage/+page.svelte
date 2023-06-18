<script lang="ts">
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { req } from '$lib/core/api';
	import DiscoverEnemy from '$lib/components/DiscoverEnemy.svelte';

	import { onMount } from 'svelte';
	import { Status, type User } from '$lib/core/types';

	let enemies: User[];

	async function getUsers() {
		const res = await req('/users', 'GET');

		if (res instanceof Status) {
			console.error(res);
		} else {
			enemies = res;
		}
	}

	onMount(async () => {
		await getUsers();
	});
</script>

<main>
	<AccountButton />

	<div class="searchBar">
		<input type="search" class="search-bar" placeholder="Search..." />
	</div>

	<div class="top-enemies">
		<h1>Hi Blablo</h1>

		<div class="moredetails-button">
			<h2>Discover top enemies</h2>

			<button
				class="moredetails-icon"
				on:click={() => {
					window.location.href = '/top-enemies';
				}}
			>
				<img src="/src/lib/images/moredetails.svg" alt="Back" />
			</button>
		</div>

		<div class="grid-container">
			{#if enemies}
				{#each enemies as user}
					<DiscoverEnemy {user} />
				{/each}
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>

	<div class="top-enemies">
		<div class="moredetails-button">
			<h2>Your mortal enemies</h2>

			<button
				class="moredetails-icon"
				on:click={() => {
					window.location.href = '/mortal-enemies';
				}}
			>
				<img src="/src/lib/images/moredetails.svg" alt="Back" />
			</button>
		</div>

		<div class="grid-container">
			{#each enemies as user}
				<DiscoverEnemy {user} />
			{/each}
		</div>
	</div>
</main>

<style>
	.searchBar {
		display: flex;
		justify-content: center;
		margin-bottom: var(--margin40);
	}

	.search-bar {
		width: 80vw;
		height: 20px;
	}

	.top-enemies {
		margin-top: var(--margin40);
		margin-bottom: var(--margin40);
		margin-left: var(--margin40);
	}

	.grid-container {
		display: flex;
		gap: var(--margin20);
		overflow-x: auto;
	}

	.moredetails-button {
		display: flex;
		align-items: center;
	}

	.moredetails-icon img {
		width: 8px;
		height: 12px;
		margin-left: var(--margin20);
	}
</style>
