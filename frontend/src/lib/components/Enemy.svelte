<script lang="ts">
  export let enemy: {
        id: number;
		title: string;
        personality: string;
        compatibility: string;
        description: string;
    };

	function getImageSource(personality: string) {
    if (personality === 'ENFJ') {
      return 'ENFJ.svg';
    } else if (personality === 'ENFP') {
      return 'ENFP.svg';
    } else if (personality === 'ENFP') {
      return 'ENFP.svg';
    } else if (personality === 'ENTJ'){
		return 'ENTJ.svg'
	} else if (personality === 'ENTP'){
		return 'ENTP.svg'
    } else if (personality === 'ESFJ'){
		return 'ESFJ.svg'
	} else if (personality === 'ESFP'){
		return 'ESFP.svg'
	} else if (personality === 'ESTJ'){
		return 'ESTJ.svg'
	} else if (personality === 'ESTP'){
		return 'ESTP.svg'
	} else if (personality === 'INFJ'){
		return 'INFJ.svg'
	} else if (personality === 'INFP'){
		return  'INFP.svg'
	} else if (personality === 'INTJ'){
		return 'INTJ.svg'
	} else if (personality === 'INTP'){
		return 'INTP.svg'
	} else if (personality === 'ISFJ'){
		return 'ISFJ.svg'
	} else if (personality === 'ISFP'){
		return 'ISFP.svg'
	} else if (personality === 'ISTJ'){
		return 'ISTJ.svg'
	} else if (personality === 'ISTP'){
		return 'ISTP.svg'
	}
}
</script>
  
  <div class="enemy-grid-item">
    <div class="image-container">
	<img src={getImageSource(enemy.personality)} alt={enemy.title} />
    </div>
    <div class="enemy-information">
      <div class="enemy-details">
        <p><b>{enemy.title}</b></p>
		  <p><b>{enemy.compatibility}</b></p> 
      </div>
      <p>{enemy.personality}</p>
	   <p>{enemy.description}</p>
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
  