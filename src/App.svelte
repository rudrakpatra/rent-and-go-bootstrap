<script lang="ts">
    import Loader from "./lib/Loader.svelte";
    import { tooltip } from "./lib/Tooltip/tooltip";
    import { validation } from "./lib/Validation/validation";
    import googlemapslogo from "./assets/googlemapslogo.png";


    let currentDate = new Date();
    //fill in the current date
    let date = currentDate.getDate();
    let month = currentDate.getMonth(); //Be careful! January is 0 not 1
    let year = currentDate.getFullYear();
    let dateString = date + "/" + (month + 1).toString().padStart(2,"0") + "/" + year;
    let timeString = currentDate.getHours().toString().padStart(2,"0") + ":" + currentDate.getMinutes().toString().padStart(2,"0");
    

    let formEventToJSONData=(e)=>{
      console.log(e);
      let data={};
      let form=e.currentTarget;
      let formData=new FormData(form);
      for(let [key,value] of formData.entries()){
        data[key]=value;
      }
      console.log(data);
      return data;
    }
</script>

<!-- <Loader> -->
  <form 
  on:submit|preventDefault={formEventToJSONData}>
    <h3>Let us know you better</h3>
    <input tabindex="0" type="text" name="fullname"
      placeholder="Full Name - (6-50 characters , alphabets and spaces only)"
      use:validation={{title:"Your name must be between 6 and 50 characters, must START and END with an alphabet and must contain alphabets and spaces only"}}
      minlength="6"
      maxlength="50" 
      pattern={"[a-zA-Z][a-zA-Z ]{4,48}[a-zA-Z]"}
    />
    <input tabindex="0" type="tel" name="phoneNumber"
      placeholder="Phone Number - (10 digits)"
      use:validation={{title:"Please enter a valid 10 digit phone number"}}
      pattern={"[0-9]{10}"}
      minlength="10"
      maxlength="10"
    />
    <h3>Pickup Details</h3>
    <span>
      <input tabindex="0" type="text" name="pickupLocation"
      placeholder="Location - (the vehicle will be delivered here)" />
      <a 
      style="display: grid; place-items: center;"
      href="https://www.google.co.in/maps" target="_blank">
        <img src={googlemapslogo} alt="google maps" 
        height="32" width="32" style="object-fit:contain;transform:translateY(-2px);"
        use:tooltip={{title:"open google maps"}}
        />
      </a>
    </span>
    <span>
      <input tabindex="0" type="text" name="pickupDate"
      placeholder="Date - {dateString}" 
      on:focus={(e)=>{
        if(e.currentTarget.value==""){
          e.currentTarget.value=dateString;
        }
      }}
      minlength="10"
      maxlength="10"
      use:validation={{title:"Please enter in the format dd/mm/yyyy"}}
      pattern={"[0-9]{2}/[0-9]{2}/[0-9]{4}"}
      />
      <input tabindex="0" type="text" name="pickupTime"
      placeholder="Time - {timeString}"
      on:focus={(e)=>{
        if(e.currentTarget.value==""){
          e.currentTarget.value=timeString;
        }
      }} 
      minlength="5"
      maxlength="5"
      use:validation={{title:"Please enter in the format hh:mm"}}
      pattern={"([01]?[0-9]|2[0-3]):[0-5][0-9]"}
      />
    
    </span>
    <button type="submit">Search For Vehicles</button>
  </form>
  <!-- <form>
    <h1>Find the vehicle you need</h1>
    <label for="name">User</label>
    <input type="text" />
  </form> -->
<!-- </Loader> -->

<style lang='scss'>
  form{
    user-select: none;
    text-align: start;

    display: flex;
    flex-direction: column;
    gap:0.5rem;

    h1,h2,h3,h4,input,button{
      margin: 0.15em 0;
      padding: 0.5rem;
    }
    h1,h2,h3,h4{
      padding-right:6rem;
    }
    span{
      display: flex;
      flex-direction: row;
      gap:0.5rem;
      align-items: center;
      input{
        flex:1;
      }
    }
    img:hover{
      filter:brightness(1.2);
    }

    input,button{
      border: 2px solid var(--clr-1);
      border-radius: 5px;
    }
    input{
      user-select: text;
      color: var(--clr-1);
      background-color: var(--clr-p);
      outline:none;
      background-color: var(--clr-3);
      transition: border-color 0.2s ease-in-out;
      border-color: var(--clr-a);
    }

    input:placeholder-shown{
      border-color: var(--clr-p);
    }
    input:not(:placeholder-shown){
      &:valid{
        border-color: var(--clr-s);
      }
      &:invalid {
        border-color: var(--clr-e);
      }
    }
    input:focus{
      outline: none;
      border-color: var(--clr-1);
    }
    button{
      cursor: pointer;
      touch-action: manipulation;
      color: var(--clr-1);
      background-color: var(--clr-p);
      font-weight: bold;
      text-transform: uppercase;
      border-color: var(--clr-p);
      transition: background-color 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      &:focus{
        outline: none;
        border-color: var(--clr-1);
      }
      &:hover{
        background-color: var(--clr-p-hover);
      }
      &:active{
        transition-duration: 20ms;
        background-color: var(--clr-p-active);
      }
    }
  }
</style>
