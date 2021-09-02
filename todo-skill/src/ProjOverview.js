import React, {useState, useEffect} from 'react'
// import TableView from "./TableView.js"
import { TableView } from "./TableView"
import Select from 'react-select';

function ProjOverview() {
    const [todo, setTodo] = useState([])  
    const [todofilter, setfilter] = useState([])
    var projects = []
    var project_list = [{"label":"All","values":"All"}]

    useEffect(()=> {
      fetch('/api').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => setTodofun(data))
      },[])

      const getTodo = () =>
      {
        fetch('/api').then(response => {
          if(response.ok){
            return response.json()
          }
        }).then(data => setTodofun(data))
      }

      const setTodofun = (data) =>
      {
        
        setTodo(data)
        setfilter(data)
      }
   
    todofilter.map(values =>
      projects.indexOf(values.spl) < 0 ? projects.push(values.spl) : console.log("")
     )
     
     projects.map(spl =>
       project_list.push({"label":spl,"values":spl})
     )
      

     const handleFilter = (spl) =>{
      if(spl.values !== "All")
      {
        var copy_row = []
        for(var i=0;i<todofilter.length;i++)
          {            
            if(todofilter[i].spl === spl.values)
            copy_row.push(todofilter[i])
          }
          setTodo(copy_row)
      }
     else
     getTodo()
     
    }

    return (
        <div className="ProjOverview">
           <h1>Project Portfolio</h1>
           <Select defaultValue={{"label":"All","values":"All"}} options={project_list} onChange={(spl) => handleFilter(spl)}></Select>
           <TableView todo={todo} getLatestTodos={getTodo}></TableView>
        </div>
    )
}

export default ProjOverview
