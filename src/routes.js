import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Input from "./components/Input/Input";

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/new' component={Input} />
    <Route path='/edit/:id' component={Input} />
  </Switch>
);