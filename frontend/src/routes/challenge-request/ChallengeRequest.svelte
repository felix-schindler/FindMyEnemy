<script lang="ts">
	import UserIcon from '$lib/images/user.svg';
	import declineIcon from '$lib/images/decline.svg';
	import acceptIcon from '$lib/images/accept.svg';
	import type { Challenge } from '$lib/core/types';

	export let challenge: Challenge;
</script>

<div class="challenge">
	<div class="enemy">
			<img src={UserIcon} alt="user" />
			<p style="margin-top: var(--margin20);">{challenge.user_2.username}</p>
	</div>
	<div class="response">
		 <div class="decline">
			<img src={declineIcon} alt="decline" />
			<p>Decline</p>
		</div>
		<div class="accept">
			<a href="/clicker-challenge?user={challenge.user_2.id}">
				<img src={acceptIcon} alt="accept" />
			</a>
			<p>Accept</p>
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
