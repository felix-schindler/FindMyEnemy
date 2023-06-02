<script lang="ts">
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import account from '$lib/images/user.svg';
	import crown from '$lib/images/crown.svg';
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';

	async function getClickAmountUser() {
		const res = await req('/challenges', 'GET');
	}

	let showUserCrown = false;
	let showEnemyCrown = false;

	let userClicks = 13;
	let enemyClicks = 18;

	onMount(() => {
		showUserCrown = userClicks > enemyClicks;
		showEnemyCrown = enemyClicks > userClicks;
	});

</script>

<div>
	<AccountButton />
</div>
<div>
	<BackButton />
</div>

<h1>Challenge History</h1>
<div class="container">
	<div class="challenge">
		<div class="user">
			{#if showUserCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Username</p>
			<p>{userClicks}</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			{#if showEnemyCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>{enemyClicks}</p>
		</div>
	</div>
	<div class="challenge">
		<div class="user">
			{#if showUserCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Username</p>
			<p>{userClicks}</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			{#if showEnemyCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>{enemyClicks}</p>
		</div>
	</div>
	<div class="challenge">
		<div class="user">
			{#if showUserCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Username</p>
			<p>{userClicks}</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			{#if showEnemyCrown}
				<div class="crown">
					<img src={crown} alt="crown" />
				</div>
			{/if}
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>{enemyClicks}</p>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: left;
		margin: var(--fs-title);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: large;
	}

	.challenge {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		padding: var(--padding);
		width: 80%;
		background-color: var(--primary);
		border-radius: 1rem;
		margin-bottom: var(--margin20);
	}

	.user,
	.enemy,
	.vs {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--margin20);
	}

	.vs {
		font-size: var(--fs-title);
		font-style: var(--fs-italic);
	}
	img {
		height: 3rem;
	}
	.crown {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.crown img {
		height: 1.5rem;
	}
</style>
