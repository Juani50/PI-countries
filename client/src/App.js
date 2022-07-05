import "./App.css";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { ActivityCreate } from "./components/ActivitiesCreate";
import Detail from "./components/Detail";

function App() {
  // const location = useLocation()
  // if (location.pathname === '/') document.querySelector('body').style.overflow = 'hidden'
  // else document.querySelector('body').style.overflow = ''
  return (
    
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/home"} component={Home}/>
            <Route exact path={"/"} component={LandingPage}/>
            <Route exact path={"/createActivitie"} component={ActivityCreate}/>
            <Route exact path={"/detail/:id"} component= {Detail}/>
          </Switch>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
