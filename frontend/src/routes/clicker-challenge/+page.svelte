<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import AccountButton from '$lib/components/AccountButton.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

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

	function updateTimer() {
		const minutes = Math.floor(timeLeft / 60);
		let seconds: number = timeLeft % 60;
		seconds = seconds < 10 ? Number(`0${seconds}`) : seconds;

		timeLeft = timeLeft - 1;

		if (timeLeft === 0) {
			clearInterval(timerId as number);
			if (clickButton) {
				clickButton.disabled = true;
			}
			isOverlayVisible = true;
		}
	}

	function startTimer() {
		timerId = setInterval(updateTimer, 1000) as unknown as number;
	}

	onMount(() => {
		startTimer();
	});

	afterUpdate(() => {
		clickButton = document.querySelector('#clickButton');
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
		style="margin-top:2.5rem"
		on:click={countClicks}
		disabled={timeLeft === 0 || isOverlayVisible}
	>
		<span class="clickerCircle">{clickCount} <br /> Clicks</span>
	</button>
</div>

{#if isOverlayVisible}
	<div class="overlay">
		<div class="overlay-content">
			<h2 style="color: black">Timer abgelaufen!</h2>
			<p style="color: black">Ergebnis: {clickCount} Clicks</p>
			<a href="/enemy-account" style="margin: 1rem " class="mainBtn"><span>Weiter</span></a>
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
		background-color: #fff;
		padding: 1.25rem;
		border-radius: 0.7rem;
		text-align: center;
	}

	.clickerCircle {
		height: 40vw;
		width: 40vw;
		font-size: 3rem;
	}

	@media (max-width: 480px) {
		.clickerCircle {
			font-size: 2rem;
		}
	}
</style>
