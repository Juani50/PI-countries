import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { ActivityCreate } from "./components/ActivitiesCreate";


function App() {
  return (
    
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/home"} component={Home}/>
            <Route exact path={"/"} component={LandingPage}/>
            <Route exact path={"/createActivitie"} component={ActivityCreate}/>
          </Switch>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
