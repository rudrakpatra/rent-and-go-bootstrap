<script lang="ts">
    import Loader from "./lib/Loader.svelte";
    import Home from "./Routes/Home.svelte";
    import NewCustomerForm from "./Routes/NewCustomerForm.svelte";
    import SearchVehicle from "./Routes/SearchVehicle.svelte";

    //get route from user typed url
    let route=window.location.pathname.slice(1);
    //bypass new customer form
    // route="newcustomer";

    //on browser back button press
    window.onpopstate=()=>{
        route=window.location.pathname.slice(1);
    }
    //browser on route change
    $:{
        //change actual route
        window.history.pushState({},null,route);
        console.log(window.history);
    }
</script>

{#if route==""}
    <Home bind:route/>
{:else if route=="newcustomer"}
    <NewCustomerForm bind:route
        on:submit={async({detail})=>{
            alert(JSON.stringify(detail));
            route="search";
            //api call here
            await new Promise((resolve)=>{setTimeout(resolve,2000)})
        }}
    />
{:else if route=="search"}
    <SearchVehicle bind:route
    />
{:else}
    <div class="error404">
        <h1>Page Not Found!</h1>
        <p>go to <a href="/">homepage</a></p>
    </div>
{/if}
<style>
    .error404{
        text-align: center;
    }
</style>