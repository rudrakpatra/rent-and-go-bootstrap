<script lang="ts">
    export let label="";
</script>

<div>
    <h3>{label}</h3>
    <span>
        <slot></slot>
    </span>
</div>
<style>
    div{
        user-select: none;
        text-align: start;

        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    span{
        display: flex;
        flex-direction: column;
        gap:0.5em;
    }
    h1,h2,h3,h4{
        margin:0.5em 0 0 0;
        padding-left:0.25em;
        opacity: 0.8;
        white-space: pre-wrap;
    }
</style>