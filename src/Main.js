import React from "react"
import { Switch, Route } from 'react-router-dom'
import App from "./App.js"
import Home from "./Home.js"
import Reset from "./Reset.js"
function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/start' component={App}/>
        <Route exact path='/reset' component={Reset}/>
      </Switch>
    </main>
  );
}

export default Main