<script lang="ts">
	import '$lib/style/main.css';
	import BackButton from '$lib/components/BackButton.svelte';
	import openEdit from '$lib/images/edit.svg';
	import check from '$lib/images/check.svg';
	import deleteIcon from '$lib/images/delete.svg';
	import changePasswordIcon from '$lib/images/lock.svg';
	import challengeHistoryIcon from '$lib/images/star.svg';
	import frenemiesIcon from '$lib/images/users.svg';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import { goto } from '$app/navigation';

	let username = 'Username'; // Beispiel-Benutzername
	let editing = false;

	function saveUsername() {
		editing = false;
	}
	function deleteAccount() {
		// Logic for deleting the account
	}
	function changePassword() {
		// Logic for changing the password
	}
	function viewChallengeHistory() {
		// Logic for viewing the challenge history
	}
	function viewFrenemies() {
		// Logic for viewing frenemies
	}
	function logOut() {
		window.location.href = '/auth';
	}
</script>

<div>
	<AccountButton />
</div>
<div>
	<BackButton />
</div>

<div class="container">
	<div class="content">
		<div class="profile-img">
			<img src="https://via.placeholder.com/150" alt="profile picture" />
		</div>
		<div class="formBtn">
			<div class="form">
				<div class="username-edit">
					<div class="username-field">
						{#if editing}
							<input
								type="text"
								class="username-input {editing ? 'editing' : ''}"
								bind:value={username}
							/>
						{:else}
							<span>{username}</span>
						{/if}
					</div>
					<div class="button-container">
						{#if editing}
							<button id="save-button" class="button" on:click={saveUsername}>
								<img src={check} alt="Back" />
							</button>
						{:else}
							<button
								id="edit-button"
								class="button"
								on:click={() => {
									editing = true;
								}}
							>
								<img src={openEdit} alt="Back" />
							</button>
						{/if}
					</div>
				</div>
				<button class="button" on:click={changePassword}>
					<img src={changePasswordIcon} alt="Change Password" />
					Change Password
				</button>
				<button class="button" on:click={() => goto('/challenge-history')}>
					<img src={challengeHistoryIcon} alt="Challenge History" />
					Challenge History
				</button>
				<button class="button" on:click={() => goto('/frenemies')}>
					<img src={frenemiesIcon} alt="Friend Requests" />
					Friend Requests
				</button>
				<button class="button" on:click={deleteAccount}>
					<img src={deleteIcon} alt="Delete Account" />
					Delete Account
				</button>
			</div>
			<button class="mainBtn" on:click={logOut}>
				<span>Log Out</span>
			</button>
		</div>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 2rem;
	}
	.content > div {
		margin-bottom: 1.25rem;
	}
	.button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		overflow: hidden;
	}

	.profile-img > img {
		border-radius: 100%;
	}

	.image {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.username-edit {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font: var(--font-family);
	}
	.form > button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: var(--margin20);
		color: white;
		margin: 0.5rem;
		border: 0;
	}
	.form > button > img {
		margin-right: 1rem;
	}
	.button-container > button {
		margin-left: var(--margin20);
	}
	.username-input {
		width: 75%;
		color: white;
	}
	.username-input.editing {
		border: none;
		background-color: transparent;
	}
	.formBtn {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.formBtn > button {
		margin: var(--margin40);
	}

	@media (min-width: 991px) {
		.content {
			flex-direction: row;
			padding: 0;
		}
		.content > div {
			margin: 0;
		}
	}
</style>
