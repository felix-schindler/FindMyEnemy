<script lang="ts">
    import '$lib/style/main.css';
    import leftCheveron from '$lib/images/left-cheveron.svg'; 
</script>

<div>
    <button class="back-button" on:click={() =>{
        window.history.back();
        }
    }>
    <img src={leftCheveron} alt="Back" />
    </button>

    <div class="image">
        <img src="https://via.placeholder.com/150" alt="profile picture">
    </div>
        <h1>Username</h1>
    <div>
        <form>

        </form>
    </div>
</div>

<style>
    .back-button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        overflow: hidden;
        outline: none;
    }
    img {
        border-radius: 100%
    }
</style>