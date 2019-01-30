import React, { Component } from 'react';
import axios from 'axios';
import Card from "../Card/Card";
import Episode from "../Episode/Episode";
import Header from '../Header/Header';
import './Home.css';


// Define your state with characters and episodes set equal to an empty array. For conditional rendering set a key and value that is equal to a string or a boolean. 
class Home extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      home: true
    }
  }

  componentDidMount() {
    // Hit our API endpoints that we defined in our server's index.js file, make sure these are identical. Since we are conditionally rendering both, we can get the data for both on render.
    axios.get("/api/characters").then(res => {
      console.log(res.data);
      this.setState({ characters: res.data })
    });
    axios.get('/api/episodes').then(res => {
      // console.log(res.data);
      this.setState({ episodes: res.data })
    })
  }


  // These methods are what changes the list to display
  displayChars = () => {
    this.setState({ display: "Characters" });
  }

  displayEps = () => {
    this.setState({ display: "Episodes" })
  }

  deleteChar = (id) => {
    axios.delete(`/api/characters/${id}`).then(res => {
      console.log(res);
      this.setState({ characters: res.data })
    })
  }

  editChar = (e, id, name, species) => {
    e.preventDefault();
    axios.put(`/api/characters/${id}`, { name, species }).then(res => {
      console.log(res);
      this.setState({ characters: res.data })
    });
  }

  render() {
    // Destructure our values off of state
    const { characters } = this.state;
    // Map over both arrays and pass down the whole character or episode object into the child component.
    let charList = characters.map((character, i) => (
      <Card
        character={character}
        editChar={this.editChar}
        deleteChar={this.deleteChar}
        key={i} 
      />
    ));
    return (
      <div className="Home">
        <Header
          link={this.state.home}
        />
        <div className="char-cont">{charList}</div>
      </div>
    );
  }
}

export default Home;