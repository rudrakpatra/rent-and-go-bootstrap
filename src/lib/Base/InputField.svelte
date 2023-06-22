<script lang="ts">
    export let label="";
    export let value:number=NaN;
    export let min=-100;
    export let max=100;
    export let tick=1;
    export let allowDecimal=tick<1;

    let sentiment="info";
    let secondaryLabel="";

    let isTyping=false;
    let focus=false;
    let touched=false;
   
    let text=Number.isFinite(value)?value.toString():"";
    let ref:HTMLDivElement;
    let updateValueAndText=(x:number)=>{
        value=x;
        text=Number.isFinite(x)?x.toString():"";
        isTyping=false;
    }
    let parseNumber=(x:string)=>{
        sentiment="info";
        secondaryLabel="";
        if(allowDecimal){
            return parseFloat(x);
        }else{
            if(x.includes(".")){
                sentiment="warn";
                secondaryLabel=label+" must be an integer!";
            }
            return parseInt(x);
        }
    }
    let clamp=(x:number)=>{
        if(x>max){
            ref.classList.add("tick-down");
            setTimeout(()=>{
                ref.classList.remove("tick-down");
            },200);
            sentiment="warn";
            secondaryLabel=label+" must be less than or equal to "+max+"!";
            return max;
        }
        if(x<min){
            ref.classList.add("tick-up");
            setTimeout(()=>{
                ref.classList.remove("tick-up");
            },200);
            sentiment="warn";
            secondaryLabel=label+" must be more than or equal to "+min+"!";
            return min;
        }
        if(!Number.isFinite(x)){
            sentiment="warn";
            secondaryLabel=label+" must be a number!";
            return NaN;
        }
        if(!focus){
            sentiment="success";
            secondaryLabel="Ok!";
        }
        return x;
    }
    let fractionDigitsOf=(x:number)=>{
        return x.toString().split(".")[1]?.length||0;
    }
    let tickUp=()=>{
        ref.focus();
        ref.classList.add("tick-up");
        setTimeout(()=>{
            ref.classList.remove("tick-up");
        },200);
        if(Number.isNaN(value)){
            return min;
        }else{
            return clamp(parseNumber(
                    (value+tick).toFixed(
                         Math.max(fractionDigitsOf(value),fractionDigitsOf(tick))
                    )
                ));
        }
    }
    let tickDown=()=>{
        ref.focus();
        ref.classList.add("tick-down");
        setTimeout(()=>{
            ref.classList.remove("tick-down");
        },200);
        if(Number.isNaN(value)){
            return max;
        }else{
            return clamp(parseNumber(
                    (value-tick).toFixed(
                         Math.max(fractionDigitsOf(value),fractionDigitsOf(tick))
                    )
                ));
        }
    }
</script>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
    class="number-field"
    bind:this={ref}
    tabindex="0"
    class:focus={focus}

    class:info={touched&&sentiment=="info"}
    class:warn={touched&&sentiment=="warn"}
    class:success={touched&&sentiment=="success"}
    class:error={touched&&sentiment=="error"}

    class:tick-up={false}
    class:tick-down={false}

    on:focus={()=>{
        focus=true;
        touched=true;
        isTyping=true;
        sentiment="info";
        secondaryLabel="";
    }}
    on:blur={()=>{
        focus=false;
        updateValueAndText(clamp(value));
    }}
    on:wheel|preventDefault={(e)=>{
        if(e.deltaY>=10){
            updateValueAndText(tickDown());
        }else if(e.deltaY<-10){
            updateValueAndText(tickUp());
        }
    }}
    on:keydown={(e)=>{
        if(e.key=="ArrowUp"){
            updateValueAndText(tickUp());
            e.preventDefault();
            return;
        }
        if(e.key=="ArrowDown"){
            updateValueAndText(tickDown());
            e.preventDefault();
            return;
        }
        if(e.key=="Backspace"){
            if(text.length){
                isTyping=true;
                text=text.slice(0,-1);
                value=parseNumber(text)||NaN;
            }
            return;
        }
        if(e.key=="-"){
            if(text.length){
                isTyping=true;
                value=-value;
            }
            else{
            text="-";
            }
            return;
        }
    }}
    on:keypress={(e)=>{
        if(e.key=="Enter"){
            ref.blur();
            return;
        }
        isTyping=true;
        let newValue=parseNumber(text+e.key);
        if(Number.isFinite(newValue)){
            value=newValue;
            text=text+e.key;
        }else{

        }
        return;
    }}
>
    <div class="label" class:aside={text.length || focus}>{label.slice(0,40)}</div>
    <div class="text" class:show={isTyping}>
        {text}&nbsp
    </div>
    <div class="value" class:show={Number.isFinite(value)&&!isTyping}>
        {value}
    </div>
    <div class="secondary-label">{secondaryLabel}</div>
</div>


<style lang="scss">
    .number-field{
        --border-color:var(--clr-1);
        position:relative;
        min-width: 16em;
        min-height: 1.5em;

        user-select: none;
        cursor:ns-resize;
        text-align: start;
        font-size:medium;
        outline:none;
        border: 2px solid var(--clr-p);
        transition: border-color 0.2s ease-in-out;
        &.info{
            border-color: var(--clr-i);
            .secondary-label{
                color: var(--clr-i);
            }
        }
        &.error{
            border-color: var(--clr-e);
            .secondary-label{
                color: var(--clr-e);
            }
        }
        &.warn{
            border-color: var(--clr-w);
            .secondary-label{
                color: var(--clr-w);
            }
        }
        &.success{
            border-color: var(--clr-s);
            .secondary-label{
                color: var(--clr-s);
            }
        }
        &.focus{
            border-color: var(--clr-1);
            .text:after{
                content:"|";
                position:absolute;
                right:0.1em;
                transform:translateY(-2px);
                color: var(--clr-1);
                animation:pulse 1s ease-in-out infinite;
            }
        }
        border-radius: 5px;

        margin-top: 0.5rem;

        .label{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            left:0.5em;
            font-size:75%;
            color:var(--clr-1);
            background-color: var(--clr-2);
            border-radius: 5px;
            padding:0 0.25em;
            transition: top 0.1s cubic-bezier(0.42, 0.0, 1.0, 1.0),font-size 0.1s cubic-bezier(0.42, 0.0, 1.0, 1.0);
            &.aside{
                top:-0.25em;
                font-size:60%;
            }
        }
        .value,.text{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            left:0.25em;
            color:var(--clr-1);
            padding:0 0 0 0.25em;
            transition: transform 0.1s ease-in-out;
            opacity: 0;
            &.show{
                opacity:1;
            }
            
        }
        .text{
            opacity: 0;
            &.show{
                opacity:1;
            }
        }
        .secondary-label{
            left:0.5em;
            bottom:-0.25em;
            transform:translateY(100%);
            position:absolute;
            font-size: 80%;
        }
        padding:.25em;
        margin-bottom: 1.25rem;
        &.tick-up{         
            .value{
                transform:translateY(calc(-50% - 2px));
            }
        }
        &.tick-down{
            .value{
                transform:translateY(calc(-50% + 2px));
            }
        }
    }
</style>