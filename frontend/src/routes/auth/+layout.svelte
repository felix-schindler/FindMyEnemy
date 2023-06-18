<div class="layout">
	<h1>find my enemy</h1>
	<div>
		<slot />
	</div>
</div>

<style>
	div {
		text-align: center;
	}

	h1 {
		font-weight: 500;
		margin-block-end: 1em;
	}

	@media (max-width: 420px) {
		div.layout {
			display: grid;
			grid-template-rows: 1fr 1fr;
			align-items: end;
		}

		h1 {
			max-width: 50%;
			margin: 2rem auto;
		}
	}
</style>
