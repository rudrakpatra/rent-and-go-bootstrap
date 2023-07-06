<script lang="ts">
    import { scale } from "svelte/transition";
    //image props
    export let src="";
    export let alt="";

    //card props
    export let name="Car Name Not Found"
    export let tags=[]
    export let rate=0

    //modal props



    //intersection observer
    let intersection=(el,cb)=>{
        //set up IntersectionObserver
        const observer=new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    cb(true);
                }
                else{
                    cb(false);
                }
            })
        })
        observer.observe(el);
    }
    let intersecting=false;
</script>
<div 
class="card w-100 shadow " 
transition:scale={{duration:500}}
class:intersecting use:intersection={v=>intersecting=v}>
    <img class="card-img-top" {src} {alt}>
    <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">
            {#each tags as tag}
                <span class="badge bg-secondary">{tag}</span><span class="opacity-0">,</span>
            {/each}
        </p>
    </div>
    <div class="clearfix p-3">
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <button role="button" class="btn btn-primary float-end" aria-roledescription="rent">
            @ ₹{rate}/day
        </button>
    </div>
</div>
<style>
    .card{
        overflow: hidden;
        max-width:500px;
        aspect-ratio: 7/8;
    }
    .card *{
        opacity: 0;
        transition: transform 500ms ease, opacity 500ms ease, filter 500ms ease;
    }
    .card.intersecting *{
        opacity: 1;
        transform:translate(0px , 0px);
    }
    .card img{
        max-width:100%;
        aspect-ratio: 4/2;
        object-fit:cover;
    }
    .card img[src=""]{
        background:gray;
        filter:contrast(0);
    }


    /* complex animation */
        .card img{
            transform:translate(0px , -32px);
            transition-delay: 100ms;
        }
        .card-body{
            transform:translate(-32px , 0px);
            transition-delay: 200ms;
        }
        .card button{
            transform:translate(0px , 32px);
            transition-delay: 400ms;
        }

    .badge{
        cursor: default;
        font-weight: 400;
        font-size: 0.9rem;
        margin-right:1px;
        margin-bottom: 4px;
    }
</style>