<script lang="ts">
    import { fly } from "svelte/transition";
    import Logo from "/logo.svg";
    let progress=0;
    //mocking the progress bar
    let interval=setInterval(()=>{
        progress+=Math.random()*40;
        if(progress>=100){
            progress=100;
            clearInterval(interval);
        }
    },1000);
</script>

{#if progress>=100}
    <slot></slot>
{:else}
<div class="overlay bg-dark" transition:fly={{y:-10}}>
    <div class="m-auto">
        <img src={Logo} alt="logo" width="100" height="100">
    </div>
    <div class="progress" role="progressbar" aria-label="Loading Screen" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div class="progress-bar"style="width:{progress}%" ></div>
    </div>
</div>
{/if}

<style lang="scss">
    .overlay{
        position: fixed;
        inset:0;
        min-height: 100svh;
        min-width: 100vw;
        display: grid;
        place-content: center;
        text-align: center;
        z-index: 1000;
    }
    .progress{
        width:350px;
        height:2px;
    }
</style>