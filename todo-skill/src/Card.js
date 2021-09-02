import React, { Component } from 'react';
import { Link } from "react-router-dom"


export const Card = ({ listOfTodos })=> {

    //var skill_list = []
    if (listOfTodos.length > 0) {
   
     console.log(listOfTodos)
        
        
   var task_list = []
    
        return(
            <div>
                {Object.keys(listOfTodos).map(function(keyName, keyIndex) {
                    task_list = listOfTodos[keyName].task.split(",")
                    return(
                        <div>
                            <h2>{listOfTodos[keyName].skill}</h2>
                            {task_list.map(todo =>{
                                return(
                                    <ul>
                                         <li>
                                    {todo}
                                    </li>
                                    </ul>
                                   
                                )
                            })}
                        </div>
                    )
                })}
              
            </div>
        )

     }
    else
    return "non"
    
}
