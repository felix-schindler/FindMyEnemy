<script lang="ts">
    import type { User } from '$lib/core/types';

    export let user: User; // Declare a prop named 'user' of type User
</script>

<!-- Display an image based on the user's personality 
	Display the user's username, personality and compatibility
-->

<a href="/enemy-account/{user.id}" class="grid-item">
    <img src={`${user.personality}.svg`} alt={user.username} /> 
    <div class="user-information">
        <div class="user-details">
            <p><b>{user.username}</b></p>
            <p><b>{user.compatibility}</b></p> 
        </div>
        <p>{user.personality}</p> 
    </div>
</a>


<style>
	.grid-item {
		flex: 0 0 clamp(30px, 50vw, 300px);
		position: relative;
		overflow: hidden;
		/* margin-right: var(--gap-width);
		margin-bottom: var(--margin20); */
		background-color: var(--primary);
		padding: var(--padding);
		border-radius: 10%;
	}

	.grid-item img {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.3s ease-in-out;
	}

	.user-information {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 8%;
		/* background-color: rgba(82, 79, 79, 0.371); */
		color: #fff;
	}

	.user-details {
		display: flex;
		justify-content: space-between;
	}

	/* .user-information h3, */
	.user-information p {
		margin: 0;
	}
</style>
