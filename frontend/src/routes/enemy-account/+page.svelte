<script>
	import '$lib/style/main.css';
	import enemyPic from '$lib/images/enemy_account_pic.png';
	import addEnemy from '$lib/images/add-enemy.svg';
</script>

<div class="content">
	<div class="imageContainer">
		<img src={enemyPic} alt="Enemy Profile" />
	</div>
	<div>
		<p style="font-size: 2rem;">Fred</p>
		<p style="font-weight: 400;">You have an incompatible rate of 89%</p>
	</div>
	<div class="buttonsContainer">
		<button class="mainBtn" style="flex-grow: 1;">
			<span>Challenge</span>
		</button>
		<button class="mainBtn" style="margin-left: 1.25rem;" on:click={()=> (window.location.href='/clicker-challenge')}>
			<img src={addEnemy} alt="Add Enemy" style="overflow: visible" />
		</button>
	</div>
	<div class="enemyProperties">
		<table style="width:100%">
			<tr class="spaceUnder">
				<td>Enemy Type</td>
				<td style="text-align: right; font-weight: 400;">...</td>
			</tr>
			<tr class="spaceUnder">
				<td>Personality Type</td>
				<td style="text-align: right; font-weight: 400;">...</td>
			</tr>
			<tr>
				<td>Distance</td>
				<td style="text-align: right; font-weight: 400;">...</td>
			</tr>
		</table>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 20rem;
		margin: 2rem auto;
		align-items: left;
	}

	.content > div {
		margin-bottom: 1.25rem;
	}

	.imageContainer {
		height: auto;
		align-items: start;
	}

	.imageContainer > img {
		max-width: 100%;
		max-height: 100%;
		border-radius: 1rem;
	}

	.buttonsContainer {
		display: flex;
		align-items: center;
	}

	.enemyProperties {
		width: 100%;
		height: auto;
		background-color: var(--primary);
		padding: 1rem;
		border-radius: 1rem;
	}

	tr.spaceUnder > td {
		padding-bottom: 0.5rem;
	}
</style>
