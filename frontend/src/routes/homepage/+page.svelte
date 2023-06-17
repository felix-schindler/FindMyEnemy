<script lang="ts">
	import '$lib/style/main.css';
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

		
			<!-- {#each users as user }
				
							<p><b>{user.username}</b></p>
							<p><b>{user.personality}</b></p>
						
			{/each} -->
		
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

 .grid-container,
.grid-container2 {
	display: flex;
	gap: var(--margin20);
	 overflow-x: auto; 
} 

.grid-item {
	flex: 0 0 clamp(30px, 50vw, 300px);
	position: relative;
	overflow: hidden;
	/* margin-right: var(--gap-width);
	margin-bottom: 20px; */
	background-color: var(--primary);
	padding: var(--padding);
	border-radius: 10%;
}

/* .grid-item img {
	width: 100%;
	height: auto;
	display: block;
	transition: transform 0.3s ease-in-out;
} */

/* .user-information {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: var(--padding);
	color: #fff;
}

.user-details {
	display: flex;
	justify-content: space-between;
}

.user-information h3,
.user-information p {
	margin: 0;
}

.grid-item:hover img {
	transform: scale(1.1);
}

.buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: 100%;
} */


.moredetails-button {
	display: flex;
	align-items: center;
	/* margin-bottom: 16px; */
}

.moredetails-icon img {
	/* display:inline-block; */
	width: 8px;
	/* Adjust the width and height as needed */
	height: 12px;
	/* background-image: url(/src/lib/images/moredetails.svg);    */
	/* background-size: cover;  */
	margin-left: var(--margin20);
}



</style>

