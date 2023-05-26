<script lang="ts">
	import AccountButton from "$lib/components/AccountButton.svelte";
	import BackButton from "$lib/components/BackButton.svelte";
	import account from '$lib/images/user.svg';
	import crown from '$lib/images/crown.svg';

	function clicksUser() {}
	function clicksEnemy() {}
</script>

<div>
    <AccountButton/>
</div>
<div>
    <BackButton/>
</div>

<h1>Challenge History</h1>
<div class="container">
	<div class="challenge">
		<div class="user">
			<div class="crown">
				<img src={crown} alt="crown" />
			</div>
			<img src={account} alt="user" />
			<p>Username</p>
			<p>Clicks</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			<div class="crown" />
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>Clicks</p>
		</div>
	</div>
	<div class="challenge">
		<div class="user">
			<div class="crown" />
			<img src={account} alt="user" />
			<p>Username</p>
			<p>Clicks</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			<div class="crown">
				<img src={crown} alt="crown" />
			</div>
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>Clicks</p>
		</div>
	</div>
	<div class="challenge">
		<div class="user">
			<div class="crown" />
			<img src={account} alt="user" />
			<p>Username</p>
			<p>Clicks</p>
		</div>
		<div class="vs">
			<p>VS</p>
		</div>
		<div class="enemy">
			<div class="crown">
				<img src={crown} alt="crown" />
			</div>
			<img src={account} alt="user" />
			<p>Enemyname</p>
			<p>Clicks</p>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: left;
		margin: 2rem;
		margin-left: 4rem;
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
		padding: 2.5rem;
		width: 80%;
		background-color: var(--primary);
		border-radius: 1rem;
		margin-bottom: 1rem;
	}

	.user,
	.enemy,
	.vs {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.vs {
		font-size: 2.5rem;
		font-style: italic;
	}
	img {
		height: 3rem;
	}
	.crown {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;
		height: 1.5rem;
	}
	.crown img {
		height: 1.5rem;
	}
</style>
