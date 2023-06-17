<script lang="ts">
	import '$lib/style/main.css';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { req } from '$lib/core/api';
	import DiscoverEnemy from '$lib/components/DiscoverEnemy.svelte';
	import Enemy from '$lib/components/Enemy.svelte';

	import { onMount, onDestroy } from 'svelte';
	import { Status, type User } from '$lib/core/types';
	

	let enemies: User[];

	async function getUsers() {
		const res = await req('/users', "GET");

		if (res instanceof Status) {
			console.error(res);
		} else {
			enemies = res
		}
	}

	let users = [
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

		{#if enemies}
		{#each enemies as enemy (enemy.id)}
		<DiscoverEnemy
		user={{ id: enemy.id, personality: enemy.personality, title: enemy.username }}
	  	/>
		{/each}
		{:else}
			<p>Loading...</p>
		{/if}
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
		{#each users as user (user.id)}
		<DiscoverEnemy {user} />
		{/each}
	</div> 

	
</main>

<style>
	.searchBar {
	display: flex;
	justify-content: center;
	margin-bottom: 32px;
}

.search-bar {
	width: 80vw;
	height: 20px;
}

.top-enemies {
	margin: var(--margin40);
}

 .grid-container{
	display: flex;
	gap: var(--margin20);
	 overflow-x: auto; 
} 

.moredetails-button {
	display: flex;
	align-items: center;
	/* margin-bottom: 16px; */
}

.moredetails-icon img {
	width: 8px;
	height: 12px;
	margin-left: var(--margin20);
}



</style>
