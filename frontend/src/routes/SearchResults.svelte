<script lang="ts">

    import type { User } from '$lib/core/types';
    import DiscoverEnemy from '$lib/components/DiscoverEnemy.svelte';

    export let searchedUsers: User[];
</script>

<main>

  <div class="grid-container">
    {#if searchedUsers}
        {#if searchedUsers.length > 0}
        {#each searchedUsers as user}
                <DiscoverEnemy {user} />
            {/each}
        {:else}
            <p>No enemies found</p>
        {/if}
  
    {/if}
</div>
</main>

<style>
    .grid-container {
		display: flex;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: var(--margin20);
		padding-top: var(--margin20);
		padding-bottom: var(--margin20);
		overflow-x: auto;
	}
</style>
