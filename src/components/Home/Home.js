import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import{ getChars, deleteChar } from "../../ducks/charReducer";
import{ getUser, logout } from "../../ducks/userReducer";
import axios from 'axios';
import Card from "../Card/Card";
import Episode from "../Episode/Episode";
import Header from '../Header/Header';
import './Home.css';


// Define your state with characters and episodes set equal to an empty array. For conditional rendering set a key and value that is equal to a string or a boolean. 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      loggedIn: false
    }
  }

  componentDidMount() {
    // Hit our API endpoints that we defined in our server's index.js file, make sure these are identical. Since we are conditionally rendering both, we can get the data for both on render.
    this.props.getChars();
    this.props.getUser();
    console.log(this.props.user)
    if(this.props.user.username) {
      this.setState({loggedIn: true})
    }
  }

  deleteChar = (id) => {
    this.props.deleteChar(id);
  }

  render() {
    const { logout, user } = this.props;
    console.log(user);
    console.log(this.state.loggedIn);
    // Destructure our values off of state
    // Map over both arrays and pass down the whole character or episode object into the child component.
    let charList = this.props.characters.map((character, i) => (
      <Card
        character={character}
        editChar={this.editChar}
        deleteChar={this.deleteChar}
        key={i}
        admin={user} 
      />
    ));
    return (
      <div className="Home">
        <Header
          link={this.state.home}
          loggedIn={this.state.loggedIn}
          logout={logout}
          user={user}
        />
        <NavLink className="new-btn" to="/new">Create New character</NavLink>
        <div className="char-cont">{charList}</div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { characters } = state.charReducer
  const { user } = state.userReducer;
  return { characters, user };
}

export default connect(mapStateToProps, {getChars, deleteChar, getUser, logout})(Home);