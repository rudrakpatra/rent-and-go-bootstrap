<script lang="ts">
    export let label="";
    export let multiple=false;
    export let data: Array<{label:string,value:"checked"|"indeterminate"|"unchecked"}> = [];
</script>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{label}</label>
    <div>
        {#each data as {label,value}}
            <div>
                <input type="checkbox" bind:value={value}/>
                <label>{label}</label>
            </div>
        {/each}
    </div>
</div>