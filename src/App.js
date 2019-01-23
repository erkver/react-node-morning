import React, { Component } from 'react';
import axios from 'axios';
import Card from "./components/Card/Card";
import Episode from "./components/Episode/Episode";
import Header from './components/Header/Header';
import './App.css';


// Define your state with characters and episodes set equal to an empty array. For conditional rendering set a key and value that is equal to a string or a boolean. 
class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      episodes: [],
      display: "Characters",
      name: ""
    }
  }

  componentDidMount() {
    // Hit out API endpoints that we defined in our server's index.js file, make sure these are identical. Since we are conditionally rendering both, we can get the data for both on render.
    axios.get("/api/characters").then(res => {
      // console.log(res.data);
      this.setState({characters: res.data})
    });
    axios.get('/api/episodes').then(res => {
      // console.log(res.data);
      this.setState({episodes: res.data})
    })
  }


  // These methods are what changes the list to display
  displayChars = () => {
    this.setState({display: "Characters"});
  }
    
  displayEps = () => {
    this.setState({ display: "Episodes"})
  }

  deleteChar = (id) => {
    axios.delete(`/api/characters/${id}`).then(res => {
      console.log(res);
      this.setState({characters: res.data})
    })
  }

  editChar = (e, id, name, species) => {
    e.preventDefault();
    axios.put(`/api/characters/${id}`, {name, species}).then(res => {
      console.log(res);
      this.setState({characters: res.data})
    });
  }

  render() {
    // Destructure our values off of state
    const { characters, episodes, display, edit } = this.state;
    // Map over both arrays and pass down the whole character or episode object into the child component.
    let charList = characters.map((character, i) => (
      <Card 
        character={character} 
        editChar={this.editChar} 
        deleteChar={this.deleteChar} 
        key={i} />
    ));
    let epList = episodes.map((episode, i) => (
      <Episode episode={episode} key={i} />
    ));
    return (
      <div className="App">
        <Header 
          displayChars={this.displayChars} 
          displayEps={this.displayEps} 
        />
        {/* Turnary that will either render the character list or episode list. If you are just trying to render the lists, you don't need JSX wrapper but if you are including a outer div or container HTML element to wrap all your items in, you will need to wrap the list variables in JSX
        {display === "Characters"
        ? <div className="char-cont">{charList}</div>
        : <div className="ep-cont">{epList}</div>}

        OR

        {display === "Characters" ? charList : epList}
         */}
        {display === "Characters" 
        ? <div className="char-cont">{charList}</div> 
        : <div className="ep-cont">{epList}</div>}
      </div>
    );
  }
}

export default App;
