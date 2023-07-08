<script lang="ts">
	import '$lib/style/main.css';
	import { createEventDispatcher } from 'svelte';
	import { req } from '$lib/core/api';
	import { authStore } from '$lib/core/stores';
	import toast from 'svelte-french-toast';

	export let isVisible = false;
	export let id: null = null;

	const dispatch = createEventDispatcher();
	let newPassword = '';

	async function changePassword() {
		// Logic for changing the password
		const password = prompt('Enter your new password');
		if (password) {
			const res = await req('/users/:id', 'PATCH', { password: newPassword }, { id });

			if (res.status === 200) {
				authStore.set(res.raw.user);
			} else {
				toast.error(`${res.status} ${res.msg}`);
			}
		} else {
			toast.error('You need to enter a password');
		}
		dispatch('close');
	}

	function close() {
		dispatch('close');
	}
</script>

{#if isVisible}
	<div class="modal-overlay">
		<div class="modal">
			<h3>Enter Your New Password</h3>
			<input type="password" bind:value={password} />
			<div class="button-container">
				<button on:click={changePassword}>Change Password</button>
				<button on:click={close}>Cancel</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--primary);
	}

	.modal {
		background-color: white;
		padding: 20px;
		border-radius: 4px;
		text-align: center;
	}

	.modal h3 {
		margin-bottom: 10px;
	}

	.modal input {
		width: 100%;
		margin-bottom: var(--margin20);
		padding: var(--padding);
		border-radius: var(--margin20);
	}

	.button-container {
		display: flex;
		justify-content: center;
	}

	.button-container button {
		margin: var(--margin20);
		padding: var(--padding);
		background-color: var(--primary);
		color: var(--secondary);
		border: none;
		border-radius: (--margin20);
		cursor: pointer;
	}

	.button-container button:hover {
		background-color: var(--secondary);
	}
</style>
