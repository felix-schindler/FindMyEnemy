<script lang="ts">
	import '$lib/style/main.css';
	import '$lib/style/homepage.css';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { req } from '$lib/core/api';

	import { onMount, onDestroy } from 'svelte';
	import { Status, type User } from '$lib/core/types';

	let users: User[];

	async function getUsers() {
		const res = await req('/users', "GET");

		if (res instanceof Status) {
			console.error(res);
		} else {
			users = res
		}
	}
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

		
			{#each users as user }
				
							<p><b>{user.username}</b></p>
							<p><b>{user.personality}</b></p>
						
			{/each}
		
	</div>

	<div class="top-enemies">
		<div class="moredetails-button">
			<h2>Your mortal enemies</h2>
			<span class="moredetails-icon" />
		</div>

		<!-- <div class="grid-container2">
			{#each users as user (user.id)}
				<div class="grid-item">
					<img src={user.imageSrc} alt={user.title} />
					<div class="user-information">
						<div class="user-details">
							<p>{user.title}</p>
							<p><b>{user.compatibility}</b></p>
						</div>
						<p>{user.description}</p>
					</div>
				</div>
			{/each}
		</div> -->
	</div>

	
</main>

