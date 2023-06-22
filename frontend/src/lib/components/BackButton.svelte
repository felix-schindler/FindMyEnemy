<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import backbutton from '$lib/images/left-cheveron.svg';
	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="backBtnContainer">
	<a href={previousPage} class="back-button">
		<img src={backbutton} alt="Back" />
	</a>
</div>

<style>
	.backBtnContainer {
		margin-left: 8%;
	}

	img {
		max-height: 1.5rem;
	}
</style>
