<script lang="ts">
	export let enemy: {
		id: number;
		title: string;
		personality: string;
		compatibility: string;
		description: string;
	};
</script>

<div class="enemy-grid-item">
	<div class="image-container">
		<img src={`${enemy.personality}.svg`} alt={enemy.title} />
	</div>
	<div class="enemy-information">
		<div class="enemy-details">
			<p><b>{enemy.title}</b></p>
			<p><b>{enemy.compatibility}</b></p>
		</div>
		<p>{enemy.personality}</p>
		<p>{enemy.description}</p>
	</div>
</div>

<style>
	.enemy-grid-item {
		display: flex;
		flex-basis: 100%;
		margin-bottom: var(--margin20);
		border-radius: 10%;
		background-color: #201254;
		box-sizing: border-box;
		position: relative;
	}

	.image-container {
		flex: 1;
		width: 50%;
		height: 100%;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		padding: var(--padding);
		background-color: white;
		border-top-left-radius: 10%;
		border-bottom-left-radius: 10%;
	}

	.enemy-information {
		flex: 1;
		max-width: 50%;
		padding: var(--padding);
	}

	.enemy-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--margin40);
	}

	@media (min-width: 601px) {
		.enemy-grid-item {
			flex-basis: calc(50% - 3%);
		}
	}
</style>
