<script lang="ts">
	import '$lib/style/chistory.css';
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

	let userClicks = 19;
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
			<div>
				<img src={account} alt="user" />
			</div>
			<div class="text">
				<p>Username</p>
				<p>{userClicks}</p>
			</div>
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
			<div>
				<img src={account} alt="user" />
			</div>
			<div class="text">
				<p>Enemyname</p>
				<p>{enemyClicks}</p>
			</div>
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
