<script lang="ts">
	import '$lib/style/main.css';
	import { req } from '$lib/core/api';
	import { authStore } from '$lib/core/stores';
	import { toast } from 'svelte-french-toast';

	export let isVisible = false;
	let newPassword: string;

	async function changePassword() {
		try {
			// Logic for changing the password
			const res = await req(
				'/users/:id',
				'PATCH',
				{ password: newPassword },
				{ id: $authStore.id }
			);

			// @ts-expect-error Update authStore (even if it's undefined)
			authStore.set(res.raw.user);
			isVisible = false;
			toast.success('Password changed');
		} catch (e: any) {
			toast.error(`Failed to update password ${e.message}`);
		}
	}
</script>

{#if isVisible}
	<div class="modal-overlay">
		<div class="modal">
			<h3>Enter Your New Password</h3>
			<form on:submit={changePassword}>
				<input type="password" placeholder="new password" bind:value={newPassword} />
				<div class="button-container">
					<button
						type="button"
						class="mainBtn secondary"
						on:click={() => {
							newPassword = '';
							isVisible = false;
						}}
					>
						<span>Cancel</span></button
					>
					<button type="submit" class="mainBtn">
						<span>Change Password</span>
					</button>
				</div>
			</form>
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
		background-color: transparent;
		backdrop-filter: blur(8px);
	}

	.modal {
		background-color: var(--background);
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
		padding-left: 2.5rem;
		border-radius: var(--margin20);
	}

	.button-container {
		display: flex;
		align-items: center;
		gap: var(--padding);
	}

	.mainBtn.secondary {
		background: var(--secondary);
	}

	.mainBtn.secondary > span {
		color: var(--primary);
		padding: 0.5rem 1rem;
	}

	.button-container button:hover {
		background-color: var(--secondary);
	}
</style>
