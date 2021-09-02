
import React, {useState} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form.css"
import Autocomplete,
{ createFilterOptions } from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();

export const Form = ({ userInput, onFormChange, onFormSubmit, defaultValues })=> {

    const [skill, setskill] = useState([]) 
    const [spl, setspl] = useState([]) 
    const [cat, setcat] = useState([])  
    const [task, settask] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [targetDate, settargetDate] = useState();
    const Allskills = []
    const Allspl = []
    for(let i=0; i< defaultValues.length; i++){
      if(Allskills.indexOf(defaultValues[i].skill) === -1) { 
        Allskills.push(defaultValues[i].skill)
      }
      if(Allspl.indexOf(defaultValues[i].spl) === -1) { 
        Allspl.push(defaultValues[i].spl)
      }
  }
    const handleChange_skill = (event)=>
    {
        console.log(event.target.textContent)
        setskill(event.target.textContent)
    }
    const handleChange_spl = (event)=>
    {
        console.log(event.target.textContent)
        setspl(event.target.textContent)
    }
    const handleChange_cat = (event)=>
    {
        console.log(event.value)
        setcat(event.value)
    }
    const handleChange_task = (event)=>
    {
      console.log(event.target.value)
        settask(event.target.value)
    }
   


    const formSubmit = (event)=> {
        event.preventDefault()
        onFormSubmit(skill, task, cat, startDate, targetDate, "Todo", spl)
    }
    return(
        <div className="createForm">
        <form onSubmit={formSubmit}>
            {/* <input type='text' required className = "skill" value={userInput.skill} onChange={handleChange_skill}></input> */}
            {/* <Select  isSearchable options={Allskills} onChange={handleChange_skill}/> */}
            <Autocomplete
            onChange={handleChange_spl}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push(`${params.inputValue}`);
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={Allspl}
        renderOption={(option) => option}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Enter Specialization"
            variant="outlined" />
        )}
      /> 
      <Autocomplete
            onChange={handleChange_skill}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push(`${params.inputValue}`);
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={Allskills}
        renderOption={(option) => option}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Enter Skill"
            variant="outlined" />
        )}
      />    
          <div className="task">  <input type='text' required className = "task"  onChange={handleChange_task}></input></div>
            <Select  isSearchable options={[{"label":"Theory","value":"Theory"},{"label":"Practical","value":"Practical"}]} onChange={handleChange_cat}/>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker selected={targetDate} onChange={(date) => settargetDate(date)} />
            <input className="submit" type='submit'></input>
        </form>
        </div>
        
        )
}