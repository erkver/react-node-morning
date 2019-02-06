import React from "react";
import "./Header.css"
import { NavLink } from "react-router-dom";

// Destructure methods inside functional component parameters
const Header = ({link, loggedIn, logout, user}) => {
  return (
    <div className="App-header">
      {user && user.username ? (
        <button className="header-btn" onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <NavLink className="login" to="/auth">
          Login/Register
        </NavLink>
      )}
      <h1>Rick and Morty Card Collector</h1>
      <div className="btn-cont">
        {link ? (
          <NavLink className="header-btn" to="/episodes">
            Episodes
          </NavLink>
        ) : (
          <NavLink className="header-btn" to="/">
            Characters
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
