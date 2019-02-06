import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Episode from "./components/Episode/Episode";
import Login from "./components/Login/Login";

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/auth' component={Login} />
    <Route path='/new' component={Form} />
    <Route path='/episodes' component={Episode} />
    <Route path="/edit/:id" component={Form} />
  </Switch>
);
