import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
