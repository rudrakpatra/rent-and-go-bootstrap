<script>
	export let title;
	export let x;
	export let y;
	export let style = "";
</script>
	<div 
	style={`top: ${y + 5}px; left: ${x + 5}px; `+style}>
		{title}
	</div>
<style>
	div {
		font-weight: 300;
		font-size: smaller;
		border: 1px solid var(--clr-1);
      	border-radius: 5px;
		padding: 4px;
		position: absolute;
		color:var(--clr-1);
		background-color: var(--clr-3);
	}
</style>
