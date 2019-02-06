const axios = require("axios");

module.exports = {
  getCharacters: (req, res) => {
    const db = req.app.get('db');
    db.get_characters()
      .then(response => res.status(200).json(response))
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getEpisodes: (req, res) => {
    // Another get request to external API
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then(response => {
        // console.log(response.data)
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteCharacter: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    db.delete_character(+id).then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  editCharacter: (req, res) => {
    const { id } = req.params;
    const { name, species } = req.body;
    req.app.get('db').edit_character([+id, name, species]).then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getCharacter: async (req, res) => {
    try {
      const result = await req.app.get('db').get_character(req.params.id);
      res.status(200).json(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({ errorMessage: "Something went wrong" });
    }
  }
};
