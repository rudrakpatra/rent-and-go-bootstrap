<script lang="ts">
	import { fly } from 'svelte/transition';

    export let label="";
    export let value:string="";
    // $:console.log(`value="${value}"`);
    export let maxlength:number=32;
    export let suggestions:Array<string>=[];
    let touched=false;
    let focused=false;
    let typing=false;
    let tick="";
    let index=0;
    export let feedback="";
    let feedbackType:""|"info"|"warning"|"success"|"error"="";

    export let customValidation:(value:string)=>{feedback:string,feedbackType:typeof feedbackType,suggestion:string}|null=()=>null;
    /**
     * judges the value and updates the feedback accordingly, adds ticks for animation
     * @param value the value to judge
     * @returns a suitable value for the input field, null means no suitable value is possible
     */
    export let updateFeedback=(value:string)=>{
        // console.log("updateFeedback",value);
        if(value==""){
            feedbackType="warning";
            feedback=label+" cannot be empty!";
            return "";
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
        else{
            let customFeedback=customValidation(value);
            if(customFeedback!=null){
                feedbackType=customFeedback.feedbackType;
                feedback=customFeedback.feedback;
                return customFeedback.suggestion;
            }
            feedbackType="success";
            feedback="Ok!";
            return null;
        }
    }
    let inputEl:HTMLInputElement;
    //update value
    let tickUp=()=>{
        // console.log("tickUp",value,inputEl.value);
        index=(index+suggestions.length+1)%suggestions.length;
        value=suggestions[index]||value;
        updateFeedback(value);
        tick="tick-up";
        setTimeout(()=>{
            tick="";
        },200);
    }
    let tickDown=()=>{
        // console.log("tickDown",value,inputEl.value);
        index=(index+suggestions.length-1)%suggestions.length;
        value=suggestions[index]||value;
        updateFeedback(value);  
        tick="tick-down";
        setTimeout(()=>{
            tick="";
        },200);
    }
</script>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="TextField {feedbackType}" class:focused class:touched>
    <input 
        tabindex="0"
        on:mouseover|preventDefault
        on:focus={()=>{focused=true;touched=true}}
        on:blur={()=>{
            focused=false;
            let suggestedValue=updateFeedback(inputEl.value);
            inputEl.value=suggestedValue==null?inputEl.value:suggestedValue;
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
            if(e.key=="ArrowUp"){tickUp();e.preventDefault();}
            else if(e.key=="ArrowDown"){tickDown();e.preventDefault();}
            else if(e.key=="Enter"){
                let suggestedValue=updateFeedback(inputEl.value);
                inputEl.value=suggestedValue==null?inputEl.value:suggestedValue;
                alert(value);
            }
        }}
        on:keyup={(e)=>{
            typing=false;
        }}
        on:input|preventDefault={(e)=>{
            let suggestedValue=updateFeedback(inputEl.value);
            inputEl.value=suggestedValue||inputEl.value;
        }}
        class="input {tick}" type="text" 
        placeholder=" " title=" "
        inputmode="text"
        bind:this={inputEl}
        bind:value 
    />
    <div class="label" class:aside={focused||value!=""}>{label.slice(0,40)}</div>
    {#key feedback}
        <div class="feedback" transition:fly={{y:2,duration:200}}>{feedback}</div>
    {/key}
</div>


<style lang="scss">
    .TextField{
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

            text-overflow: ellipsis;

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