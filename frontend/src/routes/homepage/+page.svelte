<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>
  import '$lib/style/main.css';
  import '$lib/style/homepage.css';
  import { onMount, onDestroy } from 'svelte';

  let viewportWidth = 0;
  let vwValue = 0;

  let scrollPosition = 0;

  onMount(() => {
    const container = document.querySelector('.grid-container');
    const buttonPrev = document.querySelector('.prevButton');
    const buttonNext = document.querySelector('.nextButton');

    if (container && buttonPrev && buttonNext) {
      const scrollLeft = () => {
        scrollPosition -= container.clientWidth;
        container.scrollTo({
          left: scrollPosition,
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

      buttonPrev.addEventListener('click', scrollLeft);
      buttonNext.addEventListener('click', scrollRight);
    }
  });

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

  let products = [
    {
      id: 1,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Timothy",
      description: "Description of Product 1"
    },
    {
      id: 2,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      description: "Description of Product 2"
    },
    {
      id: 3,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      description: "Description of Product 2"
    },
    {
      id: 4,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      description: "Description of Product 2"
    },
    {
      id: 5,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      description: "Description of Product 2"
    },
    {
      id: 6,
      imageSrc: "/src/lib/images/SpongeBob_SquarePants_character.svg.png",
      title: "Benjamin",
      description: "Description of Product 2"
    }
   
    // Add more products here
  ];
</script>

<main>

  <p>The viewport width is: {viewportWidth}px</p>
  <p>The vw value is: {vwValue}</p>
  <div class="searchBar">
  <input type="search" class="search-bar" placeholder="Search...">
  </div>
<div class="top-enemies">

<h1 style="margin-bottom: 4%;">Hi Blablo <br> something here! </h1>

<h2 style="margin-bottom: 2%;">Top enemies</h2>

<div class="grid-container" >
  {#each products as product (product.id)}
    <div class="grid-item">
      <img src={product.imageSrc} alt={product.title} />
      <div class="user-information">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  {/each}
</div>

</div>

<div class="buttons">
  <button class="reverseButton prevButton"  ><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
  <button class="reverseButton nextButton" ><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
</div>



<div class="top-enemies"> 
  <h2 style="margin-bottom: 2%;">Your mortal enemies</h2>
  
  <div class="grid-container">
    {#each products as product (product.id)}
      <div class="grid-item">
        <img src={product.imageSrc} alt={product.title} />
        <div class="user-information">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    {/each}
  </div>
  
  </div>
  
 <div class="buttons">
    <button class="reverseButton prevButton"><img src='/src/lib/images/back-icon.svg' alt="Back"></button>
    <button class="reverseButton nextButton"><img src='/src/lib/images/next-icon.svg' alt="Next"></button>
  </div> 
</main>

<style>
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
  }

.grid-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
  }
</style>