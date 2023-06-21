<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import openEdit from '$lib/images/edit.svg';
	import check from '$lib/images/check.svg';
	import deleteIcon from '$lib/images/delete.svg';
	import changePasswordIcon from '$lib/images/lock.svg';
	import challengeHistoryIcon from '$lib/images/star.svg';
	import frenemiesIcon from '$lib/images/users.svg';

	import { goto } from '$app/navigation';
	import { req } from '$lib/core/api';
	import { Status } from '$lib/core/types';
	import { authStore } from '$lib/core/stores';
	import { onMount } from 'svelte';

	let username: string;
	let editing = false;

	async function saveUsername() {
		const res = await req('/users/:id', 'PATCH', { username }, { id: $authStore.id });

		if (res.status === 200) {
			// Update authStore with new username
			// @ts-ignore
			authStore.set(res.raw.user);
		} else {
			// TODO: Handle error
		}

		editing = false;
	}

	async function deleteAccount() {
		if (!confirm('Are you sure you want to delete your account?')) return;

		// Logic for deleting the account
		const res = await req('/users/:id', 'DELETE', undefined, { id: $authStore.id });

		if (res.status === 200) {
			logOut();
		} else {
			// TODO: Handle error
		}
	}

	async function changePassword() {
		// Logic for changing the password
		const password = prompt('Enter your new password');

		if (password) {
			const res = await req('/users/:id', 'PATCH', { password }, { id: $authStore.id });

			if (res.status === 200) {
				// @ts-ignore Update authStore
				authStore.set(res.raw.user);
			} else {
				// TODO: Handle error
			}
		} else {
			// TODO: Show error
		}
	}
	function logOut() {
		// Logic for logging out
		// @ts-ignore
		authStore.set(null);
	}

	onMount(() => {
		username = $authStore.username;
	});
</script>

<div>
	<BackButton />
</div>

<div class="container">
	<div class="content">
		<img class="profile-img" src={`${$authStore.personality}.svg`} alt="Yourself" />
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
							<span>{$authStore.username}</span>
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
	div.content {
		text-align: center;
	}

	.form {
		margin-block: var(--margin40);
	}

	.button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	img.profile-img {
		max-width: 150px;
		max-height: 150px;
		border-radius: 100%;
	}

	.username-edit {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font: var(--font-family);
		outline: none;
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
