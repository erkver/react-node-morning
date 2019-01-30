require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require('massive');
const { getChars, getChar, getEps, deleteChar, editChar } = require('./controller/controller')
const port = 3001;

app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));


// Router - MUST BE THE SAME ON FRONT END. BE SURE TO ADD PROXY IN PACKAGE.JSON
app.get("/api/characters", getChars);
app.delete("/api/characters/:id", deleteChar);
app.put("/api/characters/:id", editChar);
app.get("/api/episodes", getEps);

app.listen(port, () => console.log(`Listening on port ${port}`))