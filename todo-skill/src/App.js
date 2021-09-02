import './App.css';
import Nav from "./Nav"
import Create from "./Create"
import Home from "./Home"
import ProjOverview from "./ProjOverview"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>  <Switch><Nav></Nav></Switch></Router>
     
     <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/project_portfolio">
          <ProjOverview></ProjOverview>
          </Route>
          <Route path="/create">
     <Create></Create>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
