import React from "react";
import "./Header.css"

// Destrcuture methods inside functional component parameters
const Header = ({displayChars, displayEps}) => {
  return (
    <div className="App-header">
      <h1>Rick and Morty Card Collector</h1>
      <div className="btn-cont">
        <button onClick={() => displayChars()}>Characters</button>
        <button onClick={() => displayEps()}>Episodes</button>
      </div>
    </div>
  );
};

export default Header;
