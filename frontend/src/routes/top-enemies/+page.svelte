<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>

  import { onMount, onDestroy } from 'svelte';

  let enemies = [
    {
      id: 1,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Timothy",
      type: "Mortal Enemy",
      personality: "ISTP",
      compatibility: "89%",
      distance: "12km"
    },
    {
      id: 2,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      type: "Mortal Enemy",
      personality: "ISTP",
      compatibility: "89%",
      distance: "12km"
    },
    {
      id: 3,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      type: "Mortal Enemy",
      personality: "ISTP",
      compatibility: "89%",
      distance: "12km"
    },
    {
      id: 4,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      type: "Mortal Enemy",
      personality: "ISTP",
      compatibility: "89%",
      distance: "12km"
    }
  ];

</script>

<main>

  <div class="top-enemies">

    <div class="filter-button">
      <h1 style="margin-bottom: 24px;">Top Enemies</h1>
      <span class="filter-icon"></span>
      </div>

<div class="grid-container" >
  {#each enemies as enemy (enemy.id)}
    <div class="grid-item">

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
  {/each}
</div>

</main> 

<style>

.top-enemies{
    margin-left: calc(8%);
    margin-right: calc(8%);
    margin-top: 3vw
  }

  .grid-container {
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    gap: 3%;
  }
  
    .grid-item {
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

.enemy-information{
  flex: 1;
  max-width: 50%;
  padding: 30px;
}

.enemy-details{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15%;
}

.filter-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

.filter-icon{
    display:inline-block;
  width: 32px; 
  height: 28px;
  background-image: url(/src/lib/images/filter-icon.svg);  
  background-size: cover; 
  }
  @media (min-width: 601px) {
    .grid-item {
      flex-basis: calc(50% - 3%);
    }
  }

</style>