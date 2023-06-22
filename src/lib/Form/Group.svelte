<script lang="ts">
    export let label: string;
</script>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{label}</label>
    <slot></slot>
</div>