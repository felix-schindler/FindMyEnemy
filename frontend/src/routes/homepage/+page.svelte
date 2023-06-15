<script>
	import '$lib/style/main.css';
	import '$lib/style/homepage.css';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { req } from '$lib/core/api';

	import { onMount, onDestroy } from 'svelte';

	async function getUsers() {
		const res = await req('/users', "GET");
		if (res) {
			return 'Succeded';
		} else {
			throw new Error('Could not fetch users');
		}
	}

	let users = [
		{
			id: 1,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Timothy',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 2,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 3,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			compatibility: '89%',
			description: '12km'
		},
		{
			id: 4,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			compatibility: '89%',
			description: '12km'
		}, 
		{
			id: 5,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
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

		<div class="grid-container">
			{#each users as user (user.id)}
				<div class="grid-item">
					<img src={user.imageSrc} alt={user.title} />
					<div class="user-information">
						<div class="user-details">
							<p><b>{user.title}</b></p>
							<p><b>{user.compatibility}</b></p>
						</div>
						<p>{user.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="top-enemies">
		<div class="moredetails-button">
			<h2>Your mortal enemies</h2>
			<span class="moredetails-icon" />
		</div>

		<div class="grid-container2">
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
		</div>
	</div>

	
</main>

