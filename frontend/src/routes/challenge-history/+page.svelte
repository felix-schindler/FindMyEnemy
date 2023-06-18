<script lang="ts">
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import ChallengeResult from './ChallengeResult.svelte';

	let userClicks = '12';
	let enemyClicks = '1';
	let enemyname: string;

	async function getClickAmountUser() {
		const res = await req('/challenge/:id', 'GET');

		if (res) {
			return 'Succeeded';
		} else {
			throw new Error('Could not fetch Challenge ID');
		}
	}

	const showUserCrown = writable(false);
	const showEnemyCrown = writable(false);

	function updateCrownDisplay() {
		const isMobileWidth = window.innerWidth <= 991;

		if (isMobileWidth) {
			showUserCrown.set(userClicks > enemyClicks);
			showEnemyCrown.set(enemyClicks > userClicks);
		} else {
			showUserCrown.set(false);
			showEnemyCrown.set(false);
		}
	}

	onMount(() => {
		updateCrownDisplay();
		window.addEventListener('resize', updateCrownDisplay);

		return () => {
			window.removeEventListener('resize', updateCrownDisplay);
		};
	});
</script>

<div>
	<div>
		<AccountButton />
		<BackButton />
	</div>

	<h1>Challenge History</h1>
	<div class="container">
		<ChallengeResult />
	</div>
</div>

<style>
	h1 {
		text-align: left;
		margin: var(--fs-title);
		margin-left: var(--margin40);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: large;
	}
</style>
