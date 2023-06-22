<script lang="ts">
    export let label="";
    export let value="";
    export let min=0;
    export let max=100;
    export let step=1;
    export let disabled=false;
</script>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{label}</label>
    <input type="number" bind:value min={min} max={max} step={step} disabled={disabled}/>
</div>