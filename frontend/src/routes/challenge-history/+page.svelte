<script lang="ts">
	import '$lib/style/chistory.css';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import account from '$lib/images/user.svg';
	import crown from '$lib/images/crown.svg';
	import { req } from '$lib/core/api';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let userClicks = '12';
	let enemyClicks = '1';
	let enemyname: string;

	

	async function getClickAmountUser() {
		const res = await req('/challenge/:id', 'GET');

		if (res) {
			return 'Succeeded';
		} else {
			throw new Error('Could not fetch Challenge ID');
		}
	}


	const showUserCrown = writable(false);
	const showEnemyCrown = writable(false);

	function updateCrownDisplay() {
    const isMobileWidth = window.innerWidth <= 991;

    if (isMobileWidth) {
      showUserCrown.set(userClicks > enemyClicks);
      showEnemyCrown.set(enemyClicks > userClicks);
    } else {
      showUserCrown.set(false);
      showEnemyCrown.set(false);
    }
  }

  onMount(() => {
    updateCrownDisplay();
    window.addEventListener('resize', updateCrownDisplay);

    return () => {
      window.removeEventListener('resize', updateCrownDisplay);
    };
  });
</script>

<div>
  <h1>Challenge History</h1>
  <div class="container">
    <div class="challenge">
      <div class="user">
        {#if $showUserCrown}
          {#if window.innerWidth < 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Winner</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Username</p>
          <p>{userClicks}</p>
        </div>
      </div>
      <div class="vs">
        <p>VS</p>
      </div>
      <div class="enemy">
        {#if $showEnemyCrown}
          {#if window.innerWidth > 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Loser</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Enemyname</p>
          <p>{enemyClicks}</p>
        </div>
      </div>
    </div>
	    <div class="challenge">
      <div class="user">
        {#if $showUserCrown}
          {#if window.innerWidth < 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Winner</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Username</p>
          <p>{userClicks}</p>
        </div>
      </div>
      <div class="vs">
        <p>VS</p>
      </div>
      <div class="enemy">
        {#if $showEnemyCrown}
          {#if window.innerWidth > 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Loser</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Enemyname</p>
          <p>{enemyClicks}</p>
        </div>
      </div>
    </div>
	    <div class="challenge">
      <div class="user">
        {#if $showUserCrown}
          {#if window.innerWidth < 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Winner</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Username</p>
          <p>{userClicks}</p>
        </div>
      </div>
      <div class="vs">
        <p>VS</p>
      </div>
      <div class="enemy">
        {#if $showEnemyCrown}
          {#if window.innerWidth > 991}
            <div class="crown">
              <img src={crown} alt="crown" />
            </div>
          {:else}
            <p>Loser</p>
          {/if}
        {/if}
        <div>
          <img src={account} alt="user" />
        </div>
        <div class="text">
          <p>Enemyname</p>
          <p>{enemyClicks}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
	h1 {
	    text-align: left;
	    margin: var(--fs-title);
		margin-left: var(--margin40);
	}

	.container {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    font-size: large;
	}

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

	@media (min-width: 991px){
	.user{
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-bottom: var(--margin20);
		padding: var(--padding);
	}

	.enemy{
		flex-direction: row-reverse;
		margin-bottom: var(--margin20);
		padding: var(--padding);
	}
	}
</style>