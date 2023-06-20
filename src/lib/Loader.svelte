<script lang="ts">
    import { fly } from "svelte/transition";
    import Logo from "/logo.svg";
    let progress=0;
    //mocking the progress bar
    let interval=setInterval(()=>{
        progress+=Math.random()*Math.random();
        if(progress>=100){
            clearInterval(interval);
        }
    },10);
</script>

{#if progress>=100}
    <slot></slot>
{:else}
<div class="overlay" transition:fly={{y:-10}}>
    <img src={Logo} alt="rent and go" width=100px/>
    <div class="progress-bar">
        <div class="progress" style={`width:${progress}%`}></div>
    </div>
</div>
{/if}

<style lang="scss">
    .overlay{
        position: fixed;
        inset:0;
        height: 100vh;
        width: 100vw;
        display: grid;
        place-content: center;
        background-color:var(--clr-2);
        img{
            margin:.5rem auto;
        }
        .progress-bar{
            user-select: none;
            width:200px;
            height:2px;
            background-color:var(--clr-white);
            border-radius:5px;
            .progress{
                height:100%;
                background-color:var(--clr-p);
                border-radius:5px;
            }
        }
    }

</style>