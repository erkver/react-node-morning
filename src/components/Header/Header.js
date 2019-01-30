import React from "react";
import "./Header.css"
import { NavLink } from "react-router-dom";

// Destrcuture methods inside functional component parameters
const Header = ({link}) => {
  if(link) {
    let eps = "episodes"
  } else {
    let chars = "characters"
  }
  return (
    <div className="App-header">
      <h1>Rick and Morty Card Collector</h1>
      <div className="btn-cont">
        {link 
          ? <NavLink className="header-btn" to='/episodes'>Episodes</NavLink>
          : <NavLink className="header-btn" to='/'>Characters</NavLink>
        }

      </div>
    </div>
  );
};

export default Header;
