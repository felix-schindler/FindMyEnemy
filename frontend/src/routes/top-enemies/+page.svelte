<script>
	import { onMount, onDestroy } from 'svelte';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { req } from '$lib/core/api';
	import '$lib/style/enemieslist.css';

	let enemies = [
		{
			id: 1,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Timothy',
			type: 'Mortal Enemy',
			personality: 'ISTP',
			compatibility: '89%',
			distance: '12km'
		},
		{
			id: 2,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			type: 'Mortal Enemy',
			personality: 'ISTP',
			compatibility: '89%',
			distance: '12km'
		},
		{
			id: 3,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			type: 'Mortal Enemy',
			personality: 'ISTP',
			compatibility: '89%',
			distance: '12km'
		},
		{
			id: 4,
			imageSrc: '/src/lib/images/SpongeBob_SquarePants_character.svg.png',
			title: 'Benjamin',
			type: 'Mortal Enemy',
			personality: 'ISTP',
			compatibility: '89%',
			distance: '12km'
		}
	];
	
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<main>
	<AccountButton />

	<BackButton />

	<div class="top-enemies">
		<div class="filter-button">
			<h1>Top Enemies</h1>
			<span class="filter-icon" />
		</div>

		<div class="grid-container">
			{#each enemies as enemy (enemy.id)}
				<div class="enemy-grid-item">
					<div class="image-container">
						<img src={enemy.imageSrc} alt={enemy.title} />
					</div>

					<div class="enemy-information">
						<div class="enemy-details">
							<p><b>{enemy.title}</b></p>
							<p><b>{enemy.compatibility}</b></p>
						</div>

						<p>{enemy.type}</p>
						<p>{enemy.personality}</p>
						<p>{enemy.distance}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>


