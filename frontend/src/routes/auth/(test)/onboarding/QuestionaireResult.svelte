<script lang="ts">
	import '$lib/style/questionaire-result.css';
	import enfjimg from '$lib/images/enfj.png';

	export let personality: string;
</script>

<div class="wrapper">
	<div>
		<h2>Looks like your type is</h2>
	</div>
	<div>
		<img id="typeImage" src={enfjimg} alt="Type" />
	</div>
	<div>
		<h1>{personality}</h1>
	</div>
	<div>
		<a href="/auth/register?personality={encodeURIComponent(personality)}" class="mainBtn">
			<span>Create my Account</span>
		</a>
	</div>
</div>

<style>
	#typeImage {
		width: 100%;
		height: auto;
		border-radius: 5%;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2.5rem;
		align-items: center;
	}

	.wrapper > div {
		margin-bottom: 1.25rem;
	}

	@media (min-width: 481px) {
		#typeImage {
			max-width: 25vw;
		}
	}
</style>
