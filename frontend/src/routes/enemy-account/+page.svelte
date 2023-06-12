<script>
	import '$lib/style/main.css';
	import '$lib/style/enemy-account.css'
	import enemyPic from '$lib/images/enemy_account_pic.png';
	import addEnemy from '$lib/images/add-enemy.svg';
	
</script>

<div class="content">
	<div class="mainProperties">
		<div class="imageContainer">
			<img src={enemyPic} alt="Enemy Profile" />
		</div>
		<div>
			<p style="font-size: 2rem;">Fred</p>
		</div>
	</div>
	<div>
		<p style="font-weight: 400; font-size: 1rem">You have an incompatible rate of 89%</p>
	</div>
	<div class="buttonsContainer">
		<button
			class="mainBtn"
			style="flex-grow: 1;"
			on:click={() => (window.location.href = '/clicker-challenge')}
		>
			<span>Challenge</span>
		</button>
		<button class="mainBtn" style="margin-left: 1.25rem;">
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