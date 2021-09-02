import React, { useState, useEffect } from 'react';
import "./Nav.css"
import {
    Link
} from "react-router-dom";

function Nav(){

    
  
    return (
        <div className="nav__black">
            
            <div className="button-group">
            <h2 className="title">Todo Skills</h2>
            <button onClick={() => {window.location.href="/home"}}>Home</button>
            <button onClick={() => {window.location.href="/project_portfolio"}}>Project Portfolio</button>
            <button onClick={() => {window.location.href="/create"}}>Create</button>
           </div>
           
             <img 
            className="nav__avatar" 
            src="https://vignette.wikia.nocookie.net/wiki-imperial/images/e/e2/Gouenji_preparando_pra_chutar..png/revision/latest?cb=20180510043458&path-prefix=pt-br" 
            alt="Netflix Logo"
            ></img>
           
        </div>
    );
};


export default Nav;