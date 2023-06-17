<script lang="ts">
    export let enemy: {
    id: number;
    imageSrc: string;
    title: string;
    compatibility: string;
    type: string;
    personality: string;
    distance: string;
  };
</script>
  
  <div class="enemy-grid-item">
    <div class="image-container">
      <img src={enemy.imageSrc} alt={enemy.title} />
    </div>
    <div class="enemy-information">
      <div class="enemy-details">
        <p><b>{enemy.title}</b></p>
        <p><b>{enemy.compatibility}</b></p>
      </div>
      <p>{enemy.type}</p>
      <p>{enemy.personality}</p>
      <p>{enemy.distance}</p>
    </div>
  </div>

  <style>
    	.enemy-grid-item {
		display: flex;
		flex-basis: 100%;
		margin-bottom: 34px;
		border-radius: 10%;
		background-color: #201254;
		box-sizing: border-box;
	}

    
	.image-container {
		flex: 1;
		max-width: 50%;
	}

	.image-container img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		padding: 10%;
		background-color: white;
		border-top-left-radius: 10%;
		border-bottom-left-radius: 10%;
	}

	.enemy-information {
		flex: 1;
		max-width: 50%;
		padding: 30px;
	}

    .enemy-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15%;
	}
  </style>
  