<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Tooltip, Toast, Popover,Modal } from 'bootstrap';

    export let route="newcustomer";

    let customerJSON=localStorage.getItem('customer');

    let autoFillModal=(el)=>{
        let autoFillModal=new Modal(el, {keyboard: false});
        if(customerJSON){
            autoFillModal.show();
        }
    };
    let autofill=()=>{
        console.log('autofill')
        let customer=JSON.parse(customerJSON);
        console.log(customer);
        for(let key in customer){
            let inputEl = formEl.querySelector(`#${key}`)as HTMLInputElement;
            if(inputEl){
                inputEl.value=customer[key];
            }
        }
        formEl.classList.add('was-validated')
    }
    let submit=createEventDispatcher();
    let tooltip = (el)=>{new Tooltip(el)}
    
    let formEl: HTMLFormElement;
    let handleSubmit = event => {
        //save the form data to local storage
        let form = new FormData(formEl);
        let json = Object.fromEntries(form.entries());
        localStorage.setItem('customer',JSON.stringify(json));
        //validate the form
        if (formEl.checkValidity()) {
            //log the json
            submit('submit',json);
        }
        formEl.classList.add('was-validated')
    }

    let paymentAmt="₹12000.00";

</script>
<div class="frame">
    <form 
        bind:this={formEl}
        on:submit|preventDefault={handleSubmit}
        class="row needs-validation" 
        autocomplete="off"
        novalidate
        >
        <h4 class="mt-5 mb-0">
            Personal Details
        </h4>
        <div class="mt-3 col-md-4">
            <label for="firstName" class="form-label">First Name*</label>
            <input id="firstName" name="firstName" type="text"  class="form-control" required >
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                Cannot be empty!
            </div>
        </div>
        <div class="mt-3 col-md-4">
            <label for="lastName" class="form-label">Last Name*</label>
            <input id="lastName" name="lastName" type="text" class="form-control"   required >
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
            Cannot be empty!
            </div>
        </div>
        <!-- select -->
        <div class="mt-3 col-md-4">
            <label for="country" class="form-label">Country*</label>
            <div>
                <select
                    id="country" name="country"
                    class="form-select dropdown-toggle" 
                    data-bs-toggle="dropdown" aria-expanded="false" required >
                    <option value="" disabled selected hidden>Select Your Country</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                </select>
                <div class="invalid-feedback">
                    Please select a valid country.
                </div>
            </div>
        </div>
        <div class="mt-3 col-md-5">
            <label for="phoneNumber" class="form-label">
                Phone Number*
                <span 
                style="cursor:default"
                use:tooltip data-bs-toggle="tooltip" data-bs-placement="right" 
                    title="We will verify it later"><i class="bi bi-info-circle"></i>
                </span>
            </label>
            <input id="phoneNumber" name="phoneNumber" type="text" minlength="10" maxLength="10" inputmode="numeric" pattern={"[0-9]{10}"} class="form-control"   required >
            <div class="valid-feedback">
            Looks good!
            </div>
            <div class="invalid-feedback">
            Please provide a valid Phone Number.
            </div>
        </div>
        <div class="mt-3 col-md-7">
            <label for="licenseNumber" class="form-label"> 
                License Number*
                <span 
                style="cursor:default"
                use:tooltip data-bs-toggle="tooltip" data-bs-placement="right" 
                    title="We will verify it later"><i class="bi bi-info-circle"></i>
                </span>
            </label>
            <input id="licenseNumber" name="licenseNumber" type="text" maxLength="16" class="form-control"
            pattern={"^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"} required >
            <div class="valid-feedback">
            Looks good!
            </div>
            <div class="invalid-feedback">
            Please provide a valid License Number.
            </div>
        </div>
    
        <h4 class="mt-5 mb-0">
            Payment Details
        </h4>
        <div class="mt-3">
            <span class="mt-auto mb-2 me-2">You are paying</span>
            <h1 class="mb-0 opacity-80">{paymentAmt}</h1>
        </div>
        <div class="mt-3 col-md-4">
            <label for="paymentMethod" class="form-label">Method*</label>
                <select id="paymentMethod" name="paymentMethod"
                    class="form-select dropdown-toggle" 
                    data-bs-toggle="dropdown" aria-expanded="false" required >
                    <option value="" disabled selected hidden>Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="UPI">UPI</option>
                </select>
                <div class="invalid-feedback">
                    Please select a valid Payment Method.
                </div>
        </div>
        <div class="mt-5 mb-0 col-12">
        <div class="form-check">
            <input id="agreement" name="agreement" class="form-check-input" type="checkbox" value="" required >
            <label for="agreement" class="form-check-label">
            Agree to terms and conditions*
            </label>
            <div class="invalid-feedback">
            You must agree before submitting.
            </div>
        </div>
        </div>
        <div class="mt-3 col-12">
            <button class="btn btn-primary float-end" type="submit">Proceed to Payment Portal</button>
        </div>
    </form>
    <div class="mt-4">
        <i>* required</i>
    </div>

    <!-- Modal-->
    <div use:autoFillModal  
    class="modal fade" tabindex="-1" aria-labelledby="formAutoFillModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="formAutoFillModal">Auto-fill last saved details?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Do you want us to fill the form with the last saved details?
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Reset</button>
            <button type="button" on:click={autofill} data-bs-dismiss="modal" class="btn btn-primary">Yes, Please</button>
            </div>
        </div>
        </div>
    </div>
</div>

<style>
    .frame{
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
    }
</style>