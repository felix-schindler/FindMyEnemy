<script lang="ts">
	import '$lib/style/main.css';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { req } from '$lib/core/api';

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

	function getImageSource(personality) {
    if (personality === 'ENFJ') {
      return 'ENFJ.svg';
    } else if (personality === 'ENFP') {
      return 'ENFP.svg';
    } else if (personality === 'ENFP') {
      return 'ENFP.svg';
    } else if (personality === 'ENTJ'){
		return 'ENTJ.svg'
	} else if (personality === 'ENTP'){
		return 'ENTP.svg'
    } else if (personality === 'ESFJ'){
		return 'ESFJ.svg'
	} else if (personality === 'ESFP'){
		return 'ESFP.svg'
	} else if (personality === 'ESTJ'){
		return 'ESTJ.svg'
	} else if (personality === 'ESTP'){
		return 'ESTP.svg'
	} else if (personality === 'INFJ'){
		return 'INFJ.svg'
	} else if (personality === 'INFP'){
		return  'INFP.svg'
	} else if (personality === 'INTJ'){
		return 'INTJ.svg'
	} else if (personality === 'INTP'){
		return 'INTP.svg'
	} else if (personality === 'ISFJ'){
		return 'ISFJ.svg'
	} else if (personality === 'ISFP'){
		return 'ISFP.svg'
	} else if (personality === 'ISTJ'){
		return 'ISTJ.svg'
	} else if (personality === 'ISTP'){
		return 'ISTP.svg'
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

			{#if users}
				{#each users as user}
					<p><b>{user.username}</b></p>
					<p><b>{user.personality}</b></p>
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
			<div class="grid-item">
				<img src={getImageSource(user.personality)} alt={user.personality} />
				<div class="user-information">
					<div class="user-details">
						<p>{user.title}</p>
						<p><b>{user.compatibility}</b></p>
					</div>
					<p>{user.personality}</p>
				</div>
			</div>
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

 .grid-item img {
	width: 100%;
	height: auto;
	display: block;
	transition: transform 0.3s ease-in-out;
} 

 .user-information {
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
} 


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

