<script>
	import '$lib/style/main.css';
	import '$lib/style/enemy-account.css'
	import enemyPic from '$lib/images/enemy_account_pic.png';
	import addEnemy from '$lib/images/add-enemy.svg';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
</script>

<div>
	<BackButton/>
	<AccountButton/>
</div>

<div id="content">
	<div id="mainProperties">
		<div id="enemyImageContainer">
			<img src={enemyPic} alt="Enemy Profile" />
		</div>
		<div>
			<p id="enemyAccountName">Fred</p>
		</div>
	</div>
	<div>
		<p id="rate">You have an incompatible rate of 89%</p>
	</div>
	<div id="buttonsContainer">
		<button class="mainBtn" style="flex-grow: 1;"
			on:click={() => (window.location.href = '/clicker-challenge')}
		>
			<span>Challenge</span>
		</button>
		<button class="mainBtn" style="margin-left: 1.25rem;">
			<img src={addEnemy} alt="Add Enemy" style="overflow: visible" />
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
				<td>...</td>
			</tr>
			<tr>
				<td>Distance</td>
				<td>...</td>
			</tr>
		</table>
	</div>
</div>