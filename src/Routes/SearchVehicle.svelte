<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import VehicleCard from "./SearchVehicles/VehicleCard.svelte";
    import { Tooltip, Toast, Popover,Modal } from 'bootstrap';
    import Logo  from '/logo.svg';

    export let route="search";

    let searchJSON=localStorage.getItem('search');
    let autofillSearchForm=(formEl)=>{
        console.log('autofill')
        let search=JSON.parse(searchJSON);
        console.log(search);
        for(let key in search){
            let inputEl = formEl.querySelector(`#${key}`)as HTMLInputElement;
            if(inputEl){
                inputEl.value=search[key];
            }
        }
        //open search options
        formEl.parentElement.classList.add('show');
        //focus on the button in the form
        formEl.querySelector('button[type="submit"]').focus();
    }

    let tooltip = (el)=>{new Tooltip(el)}
    
    let searchResults=[];
    let searchForm:HTMLFormElement;
    let simulateAPICall=()=>{
        searchResults=[{
                src:"",
                alt:"Toyota Truck",
                name:"Toyota Truck",
                tags:["Truck","Petrol","Manual","5Seater"],
                rate:800
            },{
                src:"",
                alt:"Tata Thunder",
                name:"Tata Thunder",
                tags:["Truck","Petrol","Manual","5Seater"],
                rate:750
            },{
                src:"",
                alt:"Volkswagen ",
                name:"Ford Figo",
                tags:["Truck","AC","Diesel","Manual","8Seater"],
                rate:900
            },
            {
                src:"",
                alt:"Ford Figo",
                name:"Ford Figo",
                tags:["Hatchback","AC","Petrol","Manual","5Seater"],
                rate:1000
            },
            {
                src:"",
                alt:"Honda Civic",
                name:"Honda Civic",
                tags:["Seadan","AC","Petrol","Manual","5Seater"],
                rate:1200
            }
        ]   
        setTimeout(_=>{
            searchResults[0]={
                ...searchResults[0],
                src:"https://th.bing.com/th/id/OIP.otAbuKSC47nu9Mfgh4skXQHaE8?pid=ImgDet&rs=1"
            
            }
            searchResults=[...searchResults];
        },1000)
        setTimeout(_=>{
            searchResults[1]={   
                ...searchResults[1],
                src:"https://cdn.motodev.co.za/?img=https:%2F%2Fwww.mycars.co.za%2Fuploads%2Fasset_media%2F00000000-0000-0000-0001-000001013540%2F00000000-0000-0000-0000-000000483958.jpg&w=1920&q=75&type=jpg",
            }
            searchResults=[...searchResults];
        },1200);
        setTimeout(_=>{
            searchResults[2]={
                ...searchResults[2],
                src:"https://www.team-bhp.com/forum/attachments/commercial-vehicles/1236776-pics-imported-commercial-vehicles-india-dscn2192.jpg",
            }
            searchResults=[...searchResults];
        },600);
    }
    let handleSearchFromSubmit=()=>{
        let formData=new FormData(searchForm);
        let data = Object.fromEntries(formData.entries());
        if(searchForm.checkValidity()){
            //store search data in local storage
            localStorage.setItem('search',JSON.stringify(data));
            // alert(JSON.stringify(data));
            //api call
            simulateAPICall();
        }
        searchForm.classList.add('was-validated');
    }
    let filterForm:HTMLFormElement;

    let vehicleName="";
    let minRate=null;
    let maxRate=null;
    let tags="";

    $:filteredResults=searchResults.filter(vehicle=>{
        let nameMatch = vehicle.name.toLowerCase().includes(vehicleName.toLowerCase());
        let rateMatch = (minRate==null || vehicle.rate>=minRate) && (maxRate==null || vehicle.rate<=maxRate);
        let tagsArray = tags.split(',').map(tag=>tag.trim()).filter(tag=>tag!="");
        let tagsMatch = tags=="" || vehicle.tags.some(tag=>tagsArray.some(t=>tag.toLowerCase().startsWith(t.toLowerCase())));
        return nameMatch && rateMatch && tagsMatch;
    })
</script>

<div class="f-screen"
transition:fade={{duration:500}}
>
    <nav class="navbar overlay sticky shadow-lg bg-body-tertiary">
        <div class="container-fluid d-flex">
            <img class="invertOnDark" src={Logo} alt="R&G" height="40" />
            <div>
                <button 
                type="button" class="btn btn-primary me-2" 
                data-bs-toggle="collapse" 
                data-bs-target="#searchOptions"
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle Search"
                >
                    Search <i class="bi bi-search"></i>
                </button>
                <button type="button" class="btn btn-primary" 
                data-bs-toggle="collapse" 
                data-bs-target="#filterOptions"
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle Filter"
                >
                    Filter <i class="bi bi-funnel"></i>
                </button>
            </div>
            <!-- collapsed menu -->
            <div class="mt-1 collapse w-100" id="searchOptions">
                <form 
                    bind:this={searchForm} 
                    use:autofillSearchForm
                    on:submit|preventDefault={handleSearchFromSubmit}
                    autocomplete="off" novalidate
                    class="row needs-validation">
                    <h4 class="mt-2 my-auto">Search</h4>                 
                    <!-- region -->
                    <div class="mt-2 col-md-4 col-lg-2">
                        <label for="region" class="form-label">Region*</label>
                        <select id="region" name="region" 
                        class="form-select dropdown-toggle" 
                        aria-expanded="false" title="" aria-required required>
                            <option value="" selected hidden>Select Region</option>
                            <option value="North East">North East</option>
                            <option value="South">South</option>
                            <option value="West">West</option>
                        </select>
                    </div>
                    <!-- Location -->
                    <div class="mt-2 col-md-8 col-lg-5">
                        <label for="location" class="form-label">Drop Location*</label>
                        <div class="input-group">
                            <input id="location" name="location" type="text"
                            class="form-control" title="" aria-required required>
                            <a type="button" class="btn btn-secondary"  href="https://www.google.com/maps" target="_blank">
                                <span class="d-none d-lg-inline">Open Google Maps</span> 
                                <i class="bi bi-geo-alt-fill"></i>
                            </a>
                        </div>
                    </div>
                    <!-- Drop Date -->
                    <div class="mt-2 col-md-12 col-lg-5">
                        <label for="location" class="form-label">Drop Timings*</label>
                        <div class="input-group">
                            <label for="startDate" class="input-group-text">From</label>
                            <input id="startDate" name="startDate" type="date"  class="form-control" 
                            min={new Date().toISOString().split("T")[0]} required
                            autocomplete="off">
                            <label for="endDate" class="input-group-text">To</label>
                            <input id="endDate" name="endDate" type="date"  class="form-control" 
                            min={new Date().toISOString().split("T")[0]} required
                            autocomplete="off">
                        </div>
                    </div>
                    <div class="mt-3 col-12">
                        <button class="btn btn-primary float-end" type="submit"
                        data-bs-toggle="collapse" 
                        data-bs-target="#searchOptions"
                        >
                            Search For Vehicles
                        </button>
                        <button class="btn btn-secondary me-2 float-end" type="reset">
                            Clear All Fields
                        </button>
                    </div>
                </form>
            </div>
            <div class="mt-1 collapse w-100" id="filterOptions">
                <form 
                    bind:this={filterForm} 
                    autocomplete="off" novalidate
                    class="row">
                    <h4 class="mt-2 my-auto">Filter</h4>
                    <div class="mt-2 col-md-4 col-lg-3">
                        <label for="vehicleName" class="form-label">Name</label>
                        <input bind:value={vehicleName} id="vehicleName" name="vehicleName" type="text"  class="form-control">
                    </div>
                    <div class="mt-2 col-md-8 col-lg-3">
                        <label for="minRate" class="form-label">Rate (in ₹/day)</label>
                        <div class="input-group">
                            <span class="input-group-text">Min</span>
                            <input bind:value={minRate} id="minRate" name="minRate" type="number"  class="form-control">
                            <span class="input-group-text">Max</span>
                            <input bind:value={maxRate} id="maxRate" name="maxRate" type="number"  class="form-control">
                        </div>
                    </div>
                    <div class="mt-2 col-lg-6">
                        <label for="tags" class="form-label">Tags</label>
                        <div class="input-group">
                            <input bind:value={tags}  id="tags" name="tags" type="text"  class="form-control" 
                            placeholder="example: AC, Petrol, Manual, 5Seater">
                        </div>
                    </div>
                    <!-- <div class="mt-2 col-12">
                        <button class="btn btn-secondary float-end" type="reset">
                            Clear All Filters
                        </button>
                    </div> -->
                </form>
            </div>
        </div>
    </nav>
    <div class="container search-result-container">
        {#if filteredResults.length === 0}
        <div
        in:fade={{duration: 300,delay: 200}} 
        class="f-screen center">
            <h1>No Results Found!</h1>
            {#if searchResults.length > 0}
                <h5>Try Changing Filters</h5>
            {:else}
                <h5>Please Try Searching Again</h5>
            {/if}
        </div>
        {:else}
            {#each filteredResults as result}
                <VehicleCard {...result}/>
            {/each}
        {/if}
    </div>
</div>

<style>
    .f-screen{
        position: fixed;
        inset:0;
        overflow-y: scroll;
        z-index: 1;
    }
    .center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .overlay{
        z-index: 2;
    }
    .sticky{
        position: sticky;
        top:0;
    }
    .search-result-container{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        margin:2rem auto;
    }
</style>