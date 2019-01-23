const axios = require("axios");
let characters = [];

module.exports = {
  getChars: (req, res) => {
    // Get request to external API
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      // console.log(response.data);
      characters = response.data.results;
      res.status(200).json(characters);
    }).catch(err => console.log(err));
  },
  getEps: (req, res) => {
    // Another get request to external API
    axios.get("https://rickandmortyapi.com/api/episode").then(response => {
      // console.log(response.data) 
      res.status(200).json(response.data.results);
    })
  },
  deleteChar: (req, res) => {
    let index = characters.findIndex(character => character.id == req.params.id);
    characters.splice(index, 1);
    res.status(200).json(characters);
  },
  editChar: (req, res) => {
    const { name, species } = req.body;
    let index = characters.findIndex(character => character.id == req.params.id);
    characters[index].name = name;
    characters[index].species = species;
    res.status(200).json(characters);
  }
}