<script lang="ts">
	type User = {
		id: number;
		username: string;
		email: string;
		personality: string;
		compatibility?: number;
		enemyCategory?: string;
	};

	export let user: User;
</script>

<h1>{user.username}</h1>
