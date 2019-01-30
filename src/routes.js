import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Input from "./components/Input/Input";
import Episode from "./components/Episode/Episode";

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/new' component={Input} />
    <Route path='/episodes' component={Episode} />
  </Switch>
);