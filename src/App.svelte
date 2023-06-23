<script lang="ts">
    import Loader from "./lib/Loader.svelte";
    import googlemapslogo from "./assets/googlemapslogo.png";
    import Form from "./lib/Form/Form.svelte";
    import TextField from "./lib/Form/TextField.svelte";
    import NumberField from "./lib/Form/NumberField.svelte";
    import PasswordField from "./lib/Form/PasswordField.svelte";
    import Range from "./lib/Form/Range.svelte";
    import Select from "./lib/Form/Select.svelte";
    import Group from "./lib/Form/Group.svelte";
    import Submit from "./lib/Form/Submit.svelte";
    import DateField from "./lib/Form/DateField.svelte";
    import TimeField from "./lib/Form/TimeField.svelte";
    import FileField from "./lib/Form/FileField.svelte";
    import ImageField from "./lib/Form/ImageField.svelte";
    import Link from "./lib/Form/Link.svelte";
    import CheckboxGroup from "./lib/Form/CheckboxGroup.svelte";
    import InputField from "./lib/Base/InputField.svelte";

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

<Form 
  label="We would love to know about YOU..."
  on:submit={(formData)=>{
    console.log(formData);
    //do your thing heres
  }}>
  <NumberField label="Age" min={18} max={120} />
  <NumberField label="Pay in Etheruem" value={0.5} min={0} max={1} step={0.02} feedback={"we accept Eth only"}/>
  <TextField label="Occupation" value={""} 
  suggestions={["Doctor","Doctorate","Scientist"]}
  customValidation={(value)=>{
    if(value=="Doctor")
    return {
      feedbackType:"warning",
      feedback:"You are not a doctor!",
      suggestion:"Doctorate"
    }
  }}
  />
  <TextField label="text field" value={"text field value"}/>
  <PasswordField label="password field" value={"password field value"}/>
  <DateField label="date field" value={new Date()}/>
  <!--
  <TimeField label="time field" />
  <Group label="group">
    <DateField label="date field"/>
    <TimeField label="time field"/>
  </Group>
  <Group label="group">
    <DateField label="date field"/>
    <DateField label="date field"/>
  </Group>
  <FileField label="file field"/>
  <ImageField label="image field"/>
  <Link label="link"
    img={googlemapslogo}
  />
  <CheckboxGroup 
  label="checkbox group"
  multiple 
  data={[
    {label:"checkbox 1",value:"checked"},
    {label:"checkbox 2",value:"checked"},
    {label:"checkbox 3",value:"indeterminate"},
    {label:"checkbox 4",value:"unchecked"},
  ]}/>
  <Group label="group">
    <Range label="range" min={0} max={100} value={20}/>
    <Select 
    label="select"
    data={[
        {label:"option 1",value:"option 1"},
        {label:"option 2",value:"option 2"},
        {label:"option 3",value:"option 3"},
        {label:"option 4",value:"option 4"},
      ]}/>
  </Group>
  <Submit label="submit"/> -->
</Form>

<!-- <style lang='scss'>
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
      border-color: var(--clr-p);
      transition: background-color 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        background-color: var(--clr-p-hover);
      }
      &:active{
        transition-duration: 20ms;
        background-color: var(--clr-p-active);
      }
      &:focus{
        outline: none;
        border-color: var(--clr-1);
      }
    }
    button.outline{
      background-color: transparent;
      color: var(--clr-p);
      border-color: var(--clr-p);
      &:hover{
        background-color: var(--clr-p);
        color: var(--clr-1);
      }
      &:active{
        transition-duration: 20ms;
        background-color: var(--clr-p-active);
        color: var(--clr-1);
        outline: none;
        border-color: var(--clr-1);
      }
    }
  }
</style> -->
