<script lang="ts">
	import UserIcon from '$lib/images/user.svg';
	import declineIcon from '$lib/images/decline.svg';
	import acceptIcon from '$lib/images/accept.svg';
	import type { Challenge } from '$lib/core/types';

	export let challenge: Challenge;
	export let onDelete: () => Promise<void>;
</script>

<div class="challenge">
	<div class="enemy">
		<img src={UserIcon} alt="user" />
		<p style="margin-top: var(--margin20);">{challenge.user_2.username}</p>
	</div>
	<div class="response">
		<button type="button" on:click={onDelete}>
			<img src={declineIcon} alt="" />
			<p>Decline</p>
		</button>
		<a href="/clicker-challenge/{challenge.id}?user={challenge.user_2.id}">
			<img src={acceptIcon} alt="" />
			<p>Accept</p>
		</a>
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

	.enemy {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.response {
		display: flex;
		gap: var(--padding);
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: var(--margin20);
	}

	.response button {
		/* Overwrite default styles */
		cursor: pointer;
		background: none;
		border: none;

		color: red;
	}

	.response a {
		/* Overwrite default styles */
		text-decoration: none;

		color: lightgreen;
	}

	.response button,
	.response a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		height: 3rem;
	}

	@media (min-width: 991px) {
		.enemy {
			align-items: center;
			justify-content: space-around;
			margin-bottom: var(--margin20);
			padding: var(--padding);
		}
	}
</style>
