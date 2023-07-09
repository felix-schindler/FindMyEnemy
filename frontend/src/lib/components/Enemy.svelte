<script lang="ts">
    import type { User } from '$lib/core/types';

    export let enemy: User; // Declare a prop named 'user' of type User
</script>

<!-- Display an image based on the user's personality 
	Display the user's username, personality and compatibility
-->
<a href="/enemy-account/{enemy.id}" class="enemy-grid-item">
    <div class="image-container">
        <img src={`${enemy.personality}.svg`} alt={enemy.username} /> 
    </div>
    <div class="enemy-information">
        <div class="enemy-details">
            <p>{enemy.username}</p>  
             <p>{enemy.compatibility}</p> 
        </div>
        <p>{enemy.personality}</p> 
    </div>
</a>

<style>
	a.enemy-grid-item {
		text-decoration: none;
		color: inherit;
	}

	.enemy-grid-item {
		display: flex;
		flex-basis: 100%;
		/* margin-bottom: var(--margin20); */
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
		font-weight: bold;
		margin-bottom: var(--margin40);
	}

	@media (min-width: 601px) {
		.enemy-grid-item {
			flex-basis: calc(50% - 3%);
		}
	}
</style>
