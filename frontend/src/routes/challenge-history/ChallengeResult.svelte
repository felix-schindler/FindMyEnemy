<script lang="ts">
	import UserIcon from '$lib/images/user.svg';
	import CrownIcon from '$lib/images/crown.svg';
	import type { Challenge } from '$lib/core/types';

	export let challenge: Challenge;
</script>

<div class="challenge">
	<div class="user">
		{#if challenge.user_1.won}
			<div class="crown">
				<img src={CrownIcon} alt="crown" />
			</div>
		{/if}
		<div>
			<img src={UserIcon} alt="user" />
		</div>
		<div class="text">
			<p>{challenge.user_1.username}</p>
			<p>{challenge.user_1.score}</p>
		</div>
	</div>
	<div class="vs">
		<p>VS</p>
	</div>
	<div class="enemy">
		{#if challenge.user_2.won}
			<div class="crown">
				<img src={CrownIcon} alt="crown" />
			</div>
		{/if}
		<div>
			<img src={UserIcon} alt="user" />
		</div>
		<div class="text">
			<p>{challenge.user_2.username}</p>
			<p>{challenge.user_2.score}</p>
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
