require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require('massive');
const session = require('express-session');
const { getChars, getEps, deleteChar, editChar } = require('./controller/controller');
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
app.get("/api/characters", getChars);
app.delete("/api/characters/:id", deleteChar);
app.put("/api/characters/:id", editChar);
app.get("/api/episodes", getEps);

app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/user', getUser);
app.post('/api/signout', signout)


app.listen(port, () => console.log(`Listening on port ${port}`))