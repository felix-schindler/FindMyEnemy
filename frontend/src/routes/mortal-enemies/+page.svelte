<script>
	import { onMount, onDestroy } from 'svelte';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { req } from '$lib/core/api';
	import '$lib/style/enemieslist.css';

	let enemies = [
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
		} else if (personality === 'ENTJ') {
			return 'ENTJ.svg';
		} else if (personality === 'ENTP') {
			return 'ENTP.svg';
		} else if (personality === 'ESFJ') {
			return 'ESFJ.svg';
		} else if (personality === 'ESFP') {
			return 'ESFP.svg';
		} else if (personality === 'ESTJ') {
			return 'ESTJ.svg';
		} else if (personality === 'ESTP') {
			return 'ESTP.svg';
		} else if (personality === 'INFJ') {
			return 'INFJ.svg';
		} else if (personality === 'INFP') {
			return 'INFP.svg';
		} else if (personality === 'INTJ') {
			return 'INTJ.svg';
		} else if (personality === 'INTP') {
			return 'INTP.svg';
		} else if (personality === 'ISFJ') {
			return 'ISFJ.svg';
		} else if (personality === 'ISFP') {
			return 'ISFP.svg';
		} else if (personality === 'ISTJ') {
			return 'ISTJ.svg';
		} else if (personality === 'ISTP') {
			return 'ISTP.svg';
		}
	}
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
						<img src={getImageSource(enemy.personality)} alt={enemy.personality} />
					</div>

					<div class="enemy-information">
						<div class="enemy-details">
							<p><b>{enemy.title}</b></p>
							<p><b>{enemy.compatibility}</b></p>
						</div>

						<p>{enemy.personality}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
