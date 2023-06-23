<script lang="ts">
	import { fly } from 'svelte/transition';

    export let label="";
    export let value:number=null;
    $:console.log("value",value);
    export let min=-1e18;
    export let max=1e18;
    export let step=1;
    export let maxlength:number=16;
    let touched=false;
    let focused=false;
    let typing=false;
    let tick="";
    export let feedback="";
    let feedbackType:""|"info"|"warning"|"success"|"error"="";

    let clampValue=()=>{
        console.log("clampValue",value);
        if(value>max)
            value=max;
        else if(value<min)
            value=min;
    }
    /**
     * judges the value and updates the feedback accordingly, adds ticks for animation
     * @param value the value to judge
     * @returns a suitable value for the input field, null means no suitable value is possible
     */
    let updateFeedback=(value:string)=>{
        console.log("updateFeedback",value);
        if(value==null){
            feedbackType="warning";
            feedback=label+" cannot be empty!";
            return null;
        }
        else if(value.length>maxlength){
            feedbackType="warning";
            feedback=label +" has a max-length of "+maxlength+" characters!";
            if(typing){
                tick="tick-left";
                setTimeout(()=>{
                    tick="";
                },200);
            }
            return value.slice(0,maxlength);
        }
        else if(Number(value)>max){
            feedbackType="warning";
            feedback=label +" must be less than or equal to "+max+"!";
            if(typing){
                return null;
            }
            return max.toString();
        }
        else if(Number(value)<min){
            feedbackType="warning";
            feedback=label +" must be greater than or equal to "+min+"!";
            if(typing){
                return null;
            }
            return min.toString();
        }
        else{
            feedbackType="success";
            feedback="Ok!";
            return null;
        }
    }
    let inputEl:HTMLInputElement;
    //update value
    let tickUp=()=>{
        console.log("tickUp",value,inputEl.value);
        if(value)inputEl.stepUp();
        else value=min;   
        updateFeedback(inputEl.value);
        value=Number(inputEl.value);
        tick="tick-up";
        setTimeout(()=>{
            tick="";
        },200);
    }
    let tickDown=()=>{
        console.log("tickDown",value,inputEl.value);
        if(value)inputEl.stepDown();
        else value=max; 
        updateFeedback(inputEl.value);
        value=Number(inputEl.value);
        tick="tick-down";
        setTimeout(()=>{
            tick="";
        },200);
    }
</script>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="NumberField {feedbackType}" class:focused class:touched>
    <input 
        tabindex="0"
        on:mouseover|preventDefault
        on:focus={()=>{focused=true;touched=true}}
        on:blur={()=>{
            focused=false;
            clampValue();
            updateFeedback(value.toString());
        }}
        on:wheel|preventDefault={(e)=>{
            //@ts-ignore
            (document.activeElement).blur();
            inputEl.focus();
            let d=e.deltaY;
            if(d>=10)tickDown();
            else if(d<=-10)tickUp();
        }}
        on:keydown={(e)=>{
            typing=true;
            if (["e"].includes(e.key))e.preventDefault();
            else if(e.key=="-" && value){value=-value;e.preventDefault();}
            else if(e.key=="ArrowUp"){tickUp();e.preventDefault();}
            else if(e.key=="ArrowDown"){tickDown();e.preventDefault();}
            else if(e.key=="Enter"){
                clampValue();
                updateFeedback(value.toString());
                alert(value);
            }
        }}
        on:keyup={(e)=>{
            typing=false;
        }}
        on:input|preventDefault={(e)=>{
            let v=updateFeedback(inputEl.value||null);
            if(v)inputEl.value=v.toString();
        }}
        class="input {tick}" type="number" 
        placeholder=" " title=" "
        inputmode="numeric"
        bind:this={inputEl}
        bind:value {step} {min} {max}
    />
    <div class="label" class:aside={focused||value!=null}>{label.slice(0,40)}</div>
    {#key feedback}
        <div class="feedback" transition:fly={{y:2,duration:200}}>{feedback}</div>
    {/key}
</div>


<style lang="scss">
    .NumberField{
        position:relative;
        min-width: 16em;
        min-height: 2em;
        
        user-select: none;
        text-align: start;
        font-size:medium;
        outline:none;
        border: 2px solid var(--clr-p);
        border-radius: 5px;

        margin-top: 0.5rem;
        *{
            position: absolute;
            top:0;
        }
        .label{
            pointer-events: none;
            transform: translateY(-50%);
            margin:0 0.5em;
            color:var(--clr-0);
            background-color: var(--clr-2);
            border-radius: 5px;
            padding:0 0.5em;
            transition: 
            top 0.1s cubic-bezier(0.42, 0.0, 1.0, 1.0),
            font-size 0.1s cubic-bezier(0.42, 0.0, 1.0, 1.0);
            top:50%;
            font-size:75%;
            &.aside{
                top:-0.25em;
                font-size:60%;
            }
        }
        .input{
            user-select: none;
            inset:0;
            color:var(--clr-0);
            padding:0.75em .5em .5em .5em;

            outline: none;
            border:none;
            background-color:transparent;
            font-size: 1rem;

            //tick up and down
            transition: transform 0.1s ease-in-out;
            &.tick-up{         
                transform:translateY(-2px);
            }
            &.tick-down{
                transform:translateY(2px);
            }
            &.tick-left{
                transform:translateX(-2px);
            }
        }
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        .feedback{
            pointer-events: none;
            left:0.5em;
            margin-top: 0.25em;
            top:100%;
            font-size: 80%;
        }


        transition: border-color 0.2s ease-in-out,
                    background-color 0.2s ease-in-out,
                    box-shadow 0.2s ease-in-out;

        &.focused{
            border-color: var(--clr-0);
            background-color: var(--clr-3);
        }
        @media (prefers-color-scheme: light) {
            &.focused{
            background-color: transparent;
            box-shadow:
                 0 0 0 .1em var(--clr-2),
                 0 0 0 .25em var(--clr-h)
        }
        }

        &.touched{
            &.info{
                color: var(--clr-i);
                border-color: var(--clr-i);
            }
            &.warning{
                color: var(--clr-w);
                border-color: var(--clr-w);
            }
            &.success{
                color: var(--clr-s);
                border-color: var(--clr-s);
            }
            &.error{
                color: var(--clr-e);
                border-color: var(--clr-e);
            }
        }
        margin-bottom: 1.25rem;

        ::-moz-selection {
            color: var(--clr-3);
            background: var(--clr-1);
        }
        ::selection {
            color: var(--clr-3);
            background: var(--clr-1);
        }
    }
</style>