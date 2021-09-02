
import React , {useState, useEffect} from 'react';
import { Form } from "./form"
import { Card } from "./Card"
function Create() {

    const [todo, setTodo] = useState([])  
    const [addTodo, setAddTodo] = useState([])
  
    useEffect(()=> {

        fetch('/api').then(response => {
          if(response.ok){
            return response.json()
          }
        }).then(data => setTodo(data))
      
      },[])
      
    

      const handleFormSubmit = (inputskill, inputtask,inputcat, inputstart,inputend,inputstatus,inputspl) => {
    
        setAddTodo({
            'spl': inputspl,
            'status' : inputstatus,
            'skill': inputskill,
            'task' : inputtask,
            'cat': inputcat,
            'start' : inputstart,
            'end' : inputend
        })
          fetch('/create', {
              method: 'POST',
              body: JSON.stringify({
                  skill: inputskill,
                  task: inputtask,
                  cat: inputcat,
                  start : inputstart,
                 end : inputend,
                 spl:inputspl,
                 status:inputstatus
              }),
              headers: {
                  "Content-Type": "application/json; chartset=UTF-8"
              }
          }).then(response => response.json())
            .then(message => {
                console.log(message[201])
                alert(message[201])
                setAddTodo({
                    'spl': " ",
                    'status' : " ",
                    'skill': " ",
                    'task' : " ",
                    'cat': " ",
                    'start' : " ",
                    'end' : " "
                })
                getLatestTodos()
            })
      }

      const getLatestTodos = () => {
          fetch('/api').then(response => {
              if(response.ok){
                  return response.json()
              }
          }).then(data => setTodo(data))
      }
console.log("Addtodo")
console.log(addTodo)
    return (
        <div className="Create">
           <h1>Create Task</h1>
           <Form userInput={addTodo} defaultValues={todo} onFormSubmit={handleFormSubmit}></Form>
        {/* <Card listOfTodos = {todo}/> */}
        </div>
    )
}

export default Create
