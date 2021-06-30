import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./home/home";
import MainGame from './main-game/main-game';

function App() {
  return (
    <Router>
      <div className="main-Container bg-white">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/main-game" component={MainGame} />
          <Route path="/">
            <Redirect to="home" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
