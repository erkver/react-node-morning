require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require('massive');
const session = require('express-session');
const { getCharacters, getCharacter, getEpisodes, deleteCharacter, editCharacter, } = require('./controller/controller');
const { register, login, getUser, signout } = require('./controller/auth_controller');
const port = 3001;

app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);


// Routes - MUST BE THE SAME ON FRONT END. BE SURE TO ADD PROXY IN PACKAGE.JSON
app.get("/api/characters", getCharacters);
app.get("/api/characters/:id", getCharacter);
app.delete("/api/characters/:id", deleteCharacter);
app.put("/api/characters/:id", editCharacter);
app.get("/api/episodes", getEpisodes);

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/user', getUser);
app.post('/auth/signout', signout)


app.listen(port, () => console.log(`Listening on port ${port}`))