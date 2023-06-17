<script lang="ts">
    export let user: {
        id: number;
        personality: string;
        title: string;
        // compatibility: string;
        // description: string;
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
  
  <div class="grid-item">
    <img src={getImageSource(user.personality)} alt={user.title} />
    <div class="user-information">
      <div class="user-details">
        <p><b>{user.title}</b></p>
        <!-- <p><b>{user.compatibility}</b></p> -->
      </div>
      <p>{user.personality}</p>
    </div>
  </div>

<style>
    .grid-item {
        flex: 0 0 clamp(30px, 50vw, 300px);
        position: relative;
        overflow: hidden;
        margin-right: var(--gap-width);
        margin-bottom: var(--margin20);
        background-color: var(--primary);
        padding: 5%;
        border-radius: 10%;
    }

    .grid-item img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease-in-out;
    }

    .user-information {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 8%;
        /* background-color: rgba(82, 79, 79, 0.371); */
        color: #fff;
    }

    .user-details {
        display: flex;
        justify-content: space-between;
    }

    .user-information h3,
    .user-information p {
        margin: 0;
    }
</style>