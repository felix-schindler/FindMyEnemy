<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { req } from '$lib/core/api';
	import { Status, type User } from '$lib/core/types';

	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

	import AddEnemyIcon from '$lib/images/add-enemy.svg';

	let id: string, user: User;
	$: id = $page.params.id;

	async function getUser() {
		const res = await req('/users/:id', 'GET', undefined, { id });

		if (res instanceof Status) {
			// TODO: Handle error
		} else {
			user = res;
		}
	}

	async function addFav() {
		console.error('Not implemented');
	}

	onMount(async () => {
		await getUser();
	});
</script>

<div>
	<BackButton />
	<AccountButton />
</div>

<div id="content">
	{#if user}
		<div id="mainProperties">
			<img id="enemyImageContainer" src="/{user.personality}.svg" alt={user.personality} />
			<p id="enemyAccountName">{user.username}</p>
		</div>
		<div>
			<p id="rate">You have an incompatible rate of 89%</p>
		</div>
		<div id="buttonsContainer">
			<a class="mainBtn" href="/clicker-challenge?user={user.id}" style="flex-grow: 1;">
				<span>Challenge</span>
			</a>
			<button type="button" on:click={addFav} class="mainBtn" style="margin-left: 1.25rem;">
				<img src={AddEnemyIcon} alt="Add Enemy" style="overflow: visible" />
			</button>
		</div>
		<div id="enemyProperties">
			<table>
				<tr>
					<td>Enemy Type</td>
					<td>...</td>
				</tr>
				<tr>
					<td>Personality Type</td>
					<td>{user.personality}</td>
				</tr>
				<tr>
					<td>Distance</td>
					<td>...</td>
				</tr>
			</table>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	#content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 35rem;
		margin: 2rem auto;
		padding: 2.5rem;
	}

	#content > div:not(#mainProperties) {
		margin-bottom: 1.25rem;
		width: 100%;
	}

	#mainProperties {
		display: flex;
		align-items: center;
	}

	#enemyImageContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		border-radius: 1rem;
	}

	#enemyAccountName {
		font-size: 2rem;
	}

	#rate {
		font-weight: 400;
		font-size: 1rem;
	}

	#buttonsContainer {
		display: flex;
		width: 100%;
		align-items: center;
	}

	#enemyProperties {
		width: 100%;
		height: auto;
		background-color: var(--primary);
		padding: 1rem;
		border-radius: 1rem;
	}

	div#enemyProperties table {
		width: 100%;
	}

	div#enemyProperties table tr td:not(:last-child) {
		padding-bottom: 0.5rem;
	}

	div#enemyProperties table tr td:nth-child(even) {
		text-align: right;
		font-weight: 400;
	}

	@media (max-width: 479px) {
		#mainProperties {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		#enemyImageContainer {
			padding-bottom: 1.25rem;
		}
	}

	@media (min-width: 480px) {
		#enemyImageContainer {
			max-width: 8rem;
			margin-bottom: 2.5rem;
		}

		#enemyAccountName {
			margin-bottom: 2.5rem;
		}

		#mainProperties :first-child {
			margin-right: 1rem;
		}
	}
</style>
