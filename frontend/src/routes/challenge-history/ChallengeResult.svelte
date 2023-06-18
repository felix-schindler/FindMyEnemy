<script lang="ts">
	import UserIcon from '$lib/images/user.svg';
	import CrownIcon from '$lib/images/crown.svg';
	import { onMount } from 'svelte';
	import type { Challenge } from '$lib/core/types';
	import { authStore } from '$lib/core/stores';

	export let challenge: Challenge;

	let ownScore =
		challenge.user_1_id == $authStore.id ? challenge.user_1_score : challenge.user_2_score;
	let enemyScore =
		challenge.user_1_id == $authStore.id ? challenge.user_2_score : challenge.user_1_score;
	let winner = ownScore > enemyScore;
</script>

<div class="challenge">
	<div class="user">
		{#if winner}
			{#if window.innerWidth < 991}
				<div class="crown">
					<img src={CrownIcon} alt="crown" />
				</div>
			{:else}
				<p>Winner</p>
			{/if}
		{/if}
		<div>
			<img src={UserIcon} alt="user" />
		</div>
		<div class="text">
			<p>{$authStore.username}</p>
			<p>{ownScore}</p>
		</div>
	</div>
	<div class="vs">
		<p>VS</p>
	</div>
	<div class="enemy">
		{#if !winner}
			{#if window.innerWidth > 991}
				<div class="crown">
					<img src={CrownIcon} alt="crown" />
				</div>
			{:else}
				<p>Loser</p>
			{/if}
		{/if}
		<div>
			<img src={UserIcon} alt="user" />
		</div>
		<div class="text">
			<p>Enemyname</p>
			<p>{enemyClicks}</p>
		</div>
	</div>
</div>

<style>
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

	.vs p {
		font-size: var(--fs-title);
		font-style: var(--fs-italic);
	}

	img {
		height: 3rem;
	}

	.crown img {
		height: 1.5rem;
	}
	.text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media (min-width: 991px) {
		.user {
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			margin-bottom: var(--margin20);
			padding: var(--padding);
		}

		.enemy {
			flex-direction: row-reverse;
			margin-bottom: var(--margin20);
			padding: var(--padding);
		}
	}
</style>
