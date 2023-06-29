<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { req } from '$lib/core/api';
	import toast from 'svelte-french-toast';

	let opponent: number = Number($page.url.searchParams.get('user') ?? '');

	let timeLeft = 10;
	let clickCount = 0;
	let timerId: number;
	let clickButton: HTMLButtonElement | null;
	let isOverlayVisible = false;

	function countClicks() {
		if (!isOverlayVisible) {
			clickCount++;
		}
	}

	async function saveScore() {
		try {
			const res = await req('/challenges', 'POST', { score: clickCount, challengee: opponent });
			toast.success(`${res.status}: ${res.msg}`);
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	async function updateTimer() {
		let seconds: number = timeLeft % 60;
		seconds = seconds < 10 ? Number(`0${seconds}`) : seconds;

		timeLeft = timeLeft - 1;

		if (timeLeft === 0) {
			clearInterval(timerId as number);
			if (clickButton) {
				clickButton.disabled = true;
			}
			await saveScore();
			isOverlayVisible = true;
		}
	}

	function startTimer() {
		timerId = setInterval(updateTimer, 1000) as unknown as number;
	}

	onMount(async () => {
		if (!opponent) {
			await goto('/');
		}
		startTimer();
	});

	onDestroy(() => {
		clearInterval(timerId as number);
	});

	// Setze den Timer auf 30 Sekunden
	timeLeft = 10;
</script>

<div>
	<BackButton />
	<AccountButton />
</div>

<div class="clickerContainer">
	<p id="timer">
		Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10
			? `0${timeLeft % 60}`
			: timeLeft % 60}
	</p>
	<button
		class="mainBtn"
		id="clickButton"
		on:click={countClicks}
		disabled={timeLeft === 0 || isOverlayVisible}
	>
		<span class="clickerCircle">{clickCount} <br /> Clicks</span>
	</button>
</div>

{#if isOverlayVisible}
	<div class="overlay">
		<div class="overlay-content">
			<h2>Time is up</h2>
			<p>Result: {clickCount} Clicks ({clickCount / 10} CPS)</p>
			<a href="/enemy-account/{opponent}" class="mainBtn">
				<span>Continue</span>
			</a>
		</div>
	</div>
{/if}

<style>
	.clickerContainer {
		text-align: center;
		margin-top: 2.5rem;
	}

	#timer {
		font-size: var(--fs-title);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.overlay-content {
		color: black;
		background-color: white;
		padding: 1.25rem;
		border-radius: 0.7rem;
		text-align: center;
	}

	button#clickButton {
		margin-top: 2.5rem;
		transition: scale 200ms;
	}

	button#clickButton:active {
		scale: 0.975;
	}

	a.mainBtn {
		margin: 1rem;
	}

	.clickerCircle {
		height: 35vw;
		width: 35vw;
		font-size: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 480px) {
		.clickerCircle {
			height: 80vw;
			width: 80vw;
			font-size: 2rem;
		}
	}
</style>
