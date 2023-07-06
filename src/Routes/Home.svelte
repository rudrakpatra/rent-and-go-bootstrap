<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { backInOut } from "svelte/easing";

    export let route="home";
</script>

<div class="f-screen center" 
    transition:fly={{duration:500,y:-window.innerHeight,easing:backInOut}}
    on:wheel|passive={_=>route="search"}>
    <h1>Rent & Go</h1>
    <p>Renting Vehicles made <b>10x</b> simpler!</p>
    <button class="btn btn-primary" on:click={_=>route="search"}>
        Get Started <i class="bi bi-search"></i>
    </button>
</div>

<style type="scss">
    .f-screen{
        position: fixed;
        inset:0;
        overflow: show;
        z-index: 100;
    }
    .center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h1{
        font-size: clamp(4rem, 20vw, 8rem);
        letter-spacing:clamp(-8px, -2vw, -2px);
        font-weight: 400;
        transform:translateX(-6px);
    }
    button{
        font-size: x-large;
    }
</style>