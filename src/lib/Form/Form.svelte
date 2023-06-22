<script lang="ts">
    export let label="";
</script>

<div>
    {label}
    <slot></slot>
</div>
<style>
    div{
        user-select: none;
        text-align: start;

        display: flex;
        flex-direction: column;
        gap:0.5rem;
    }
</style>