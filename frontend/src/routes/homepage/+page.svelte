<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>
  import '$lib/style/main.css';
  import '$lib/style/homepage.css';
  import { onMount, onDestroy } from 'svelte';

  let viewportWidth = 0;
  let vwValue = 0;

  let scrollPosition = 0;
  let scrollPosition2 = 0;

  onMount(() => {
    const container = document.querySelector('.grid-container');
    const container2 = document.querySelector('.grid-container2');
    const buttonPrev = document.querySelector('.prevButton');
    const buttonNext = document.querySelector('.nextButton');
    const buttonPrev2 = document.querySelector('.prevButton2');
    const buttonNext2 = document.querySelector('.nextButton2');

    if (container && container2 && buttonPrev && buttonNext && buttonPrev2 && buttonNext2) {
      const scrollLeft = () => {
        scrollPosition -= container.clientWidth;
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      };

      const scrollLeft2 = () => {
        scrollPosition2 -= container2.clientWidth;
        container2.scrollTo({
          left: scrollPosition2,
          behavior: 'smooth'
        });
      };

      const scrollRight = () => {
        scrollPosition += container.clientWidth;
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      };

      const scrollRight2 = () => {
        scrollPosition2 += container2.clientWidth;
        container2.scrollTo({
          left: scrollPosition2,
          behavior: 'smooth'
        });
      };

      buttonPrev.addEventListener('click', scrollLeft);
      buttonNext.addEventListener('click', scrollRight);
      buttonPrev2.addEventListener('click', scrollLeft2);
      buttonNext2.addEventListener('click', scrollRight2);
    }
  });

  $: {
  viewportWidth = document.documentElement.clientWidth;
  }

  function getVWValue() {
     const viewportWidth = document.documentElement.clientWidth;
    const vwValue = (26/ viewportWidth) * 100;
    return vwValue;
  }


  vwValue = getVWValue();

  window.addEventListener('resize', () => {
    vwValue = getVWValue();
  });


  const updateViewportWidth = () => {
    viewportWidth = document.documentElement.clientWidth;
  };

  onMount(() => {
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateViewportWidth);
  });

  let users = [
    {
      id: 1,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Timothy",
      compatibility: "89%",
      description: "12km"
    },
    {
      id: 2,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      compatibility: "89%",
      description: "12km"
    },
    {
      id: 3,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      compatibility: "89%",
      description: "12km"
    },
    {
      id: 4,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      compatibility: "89%",
      description: "12km"
    },
    {
      id: 5,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      compatibility: "89%",
      description: "12km"
    },
    {
      id: 6,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      compatibility: "89%",
      description: "12km"
    }
  ];

</script>

<main>

   <!-- <p>The viewport width is: {viewportWidth}px</p>
  <p>The vw value is: {vwValue}</p>  -->
  <div class="searchBar">
  <input type="search" class="search-bar" placeholder="Search...">
  </div>
  
<div class="top-enemies">

<h1 style="margin-bottom: 24px;">Hi Blablo</h1>

<div class="moredetails-button">
<h2>Discover top enemies</h2>
<span class="moredetails-icon"></span>
</div>

<div class="grid-container" >
  {#each users as user (user.id)}
    <div class="grid-item">
      <img src={user.imageSrc} alt={user.title} />
      <div class="user-information">
        <div class="user-details">
        <p><b>{user.title}</b></p>
        <p><b>{user.compatibility}</b></p>
      </div>
        <p>{user.description}</p>
      </div>
    </div>
  {/each}
</div>

</div>

{#if viewportWidth > 601 } 
<div class="buttons">
  <button class="reverseButton prevButton"  ><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
  <button class="reverseButton nextButton" ><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
</div> 
 {:else}
<div class="buttons-mobile">
  <button class="reverseButton"><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
  <button class="reverseButton" ><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
</div> 
{/if} 

<div class="top-enemies"> 
  <div class="moredetails-button">
    <h2>Your mortal enemies</h2>
    <span class="moredetails-icon"></span>
    </div>
  
    <div class="grid-container2" >
      {#each users as user (user.id)}
        <div class="grid-item">
          <img src={user.imageSrc} alt={user.title} />
          <div class="user-information">
            <div class="user-details">
            <p><b>{user.title}</b></p>
            <p><b>{user.compatibility}</b></p>
          </div>
            <p>{user.description}</p>
          </div>
        </div>
      {/each}
    </div>
  
  </div>
  
  {#if viewportWidth > 601 }
  <div class="buttons">
    <button class="reverseButton prevButton2"  ><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
    <button class="reverseButton nextButton2" ><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
  </div> 
  {:else}
  <div class="buttons-mobile">
    <button class="reverseButton"><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
    <button class="reverseButton" ><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
  </div> 
  {/if}

</main> 

<style>
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
  }

  .buttons button {
    margin: 10px;
  }

  .buttons-mobile{
    display:none;
  }

  .moredetails-button{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .moredetails-icon{
    display:inline-block;
  width: 8px; /* Adjust the width and height as needed */
  height: 12px;
  background-image: url(/src/lib/images/moredetails.svg);  
  background-size: cover; 
  margin-left: 10px; 
  }

  
</style>