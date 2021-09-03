import React, {useEffect, useState} from 'react'
import "./home.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Home() {
    const [todo, setTodo] = useState([])
    const [showskill, setshowskill] = useState("") 
    const setshow = (skill) => {
        if(showskill === skill)  setshowskill("") 
        else if(showskill !== skill && showskill !== "")  setshowskill(skill)
        else setshowskill(skill)
        
    }
    useEffect(()=> {

        fetch('/api').then(response => {
          if(response.ok){
            return response.json()
          }
        }).then(data => setTodo(data))
        
      
      },[])
      var skill_list = {},spl_list = {},skill_only=[],spl_only = [],total_done_tasks = {},spl_skills={},spl_task ={}
      if (todo.length > 0) {
      for(var i=0;i<todo.length;i++)
      {
        
        if(!total_done_tasks[todo[i].spl])
        total_done_tasks[todo[i].spl] = 0
        if(todo[i].status === "Done")
        total_done_tasks[todo[i].spl] ++
      if(spl_only.indexOf(todo[i].spl) < 0)
      {
        spl_only.push(todo[i].spl)
        if(skill_only.indexOf(todo[i].skill) < 0)
        {
          skill_only.push(todo[i].skill)
           spl_list[todo[i].spl] = []
           skill_list[todo[i].skill] = []
           spl_task[todo[i].spl] = []
          spl_list[todo[i].spl].push(todo[i].skill)
          spl_task[todo[i].spl].push(todo[i].task)
          skill_list[todo[i].skill].push(todo[i].task)
        }
        else {
          skill_list[todo[i].skill].push(todo[i].task)
          spl_task[todo[i].spl].push(todo[i].task)
        }
        
      }
      else {
        if(skill_only.indexOf(todo[i].skill) < 0)
        {
          skill_only.push(todo[i].skill)
           skill_list[todo[i].skill] = []
          spl_list[todo[i].spl].push(todo[i].skill)
          spl_task[todo[i].spl].push(todo[i].task)
          skill_list[todo[i].skill].push(todo[i].task)
        }
        else {
          skill_list[todo[i].skill].push(todo[i].task)
          spl_task[todo[i].spl].push(todo[i].task)
        }
      }
  
}
      }
// console.log(spl_only)
// console.log(spl_list)
// console.log(skill_list)
// console.log(spl_task)

      if(Object.keys(spl_list).length > -1)
      {
        return (
        
            <div className="Home">
                <h1>Todo-Skills Overview</h1>
                {spl_only.map(key =>{
                  console.log(key)
                       console.log(spl_list[key])
                        return(
                            <div>
                        <div className="spl" onClick={() => setshow(key)}>
                            <h3>{key}</h3>
                        <div className="label">
                        <label>Total skills: {spl_list[key].length}</label>
                        <label>Total Tasks: {spl_task[key].length}</label>
                        <label>Total Todo Tasks: { spl_task[key].length -total_done_tasks[key]}</label></div>
                        <CircularProgressbar value={(total_done_tasks[key]/spl_task[key].length)*100} text={`${(total_done_tasks[key]/spl_task[key].length)*100}%`} />
                       </div>
                        {spl_list[key].map(key_skill =>{
                          //  console.log(key_skill+"==")
                          //  console.log(skill_list[spl_list[key_skill]])
                          if(showskill === key)
                         
                            return( <div className="skills show">
                            <h3>{key_skill}</h3>
                            <div className="label"><label>Total Tasks: {skill_list[key_skill].length}</label>
                            </div>
                            </div>)
                            else{
                              return( <div className="skills hide">
                              <h3>{key_skill}</h3>
                              <div className="label"><label>Total Tasks: {skill_list[key_skill].length}</label>
                              </div>
                              </div>)
                            }
                           
                        })}
                        </div>
                        )
                    })}

                    
                
            </div>
        )
      }
      else
      return(<h2>None to show</h2>)
    
  }

export default Home
