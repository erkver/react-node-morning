const axios = require("axios");
let characters = [];

module.exports = {
  getChars: (req, res) => {
    // Get request to external API
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      // console.log(response.data);
      res.status(200).json(response.data.results);
    }).catch(err => console.log(err));
  },
  getEps: (req, res) => {
    // Another get request to external API
    axios.get("https://rickandmortyapi.com/api/episode").then(response => {
      // console.log(response.data) 
      res.status(200).json(response.data.results);
    })
  }
}