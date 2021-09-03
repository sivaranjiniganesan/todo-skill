// import './App.css';
// import Nav from "./Nav"
// import Create from "./Create"
// import Home from "./Home"
// import ProjOverview from "./ProjOverview"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//        {/* <Router>  <Switch><Nav></Nav></Switch></Router> */}
     
//      <Router>
//         <Switch>
//           {/* <Route path="/home">
//             <Home></Home>
//           </Route>
//           <Route path="/project_portfolio">
//           <ProjOverview></ProjOverview>
//           </Route> */}
//           <Route path="/create">
//      <Create></Create>
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;



import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('https://todo-skill.herokuapp.com/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        
        <p>React + Flask Tutorial</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
    </div>
  );
}

export default App;