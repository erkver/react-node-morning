const express = require("express");
const app = express();
const { json } = require("body-parser");
const { getChars, getChar, getEps, deleteChar, editChar } = require('./controller/controller')
const port = 3001;

app.use(json());

// Router - MUST BE THE SAME ON FRONT END. BE SURE TO ADD PROXY IN PACKAGE.JSON
app.get("/api/characters", getChars);
app.get("/api/characters/:id", getChar);
app.delete("/api/characters/:id", deleteChar);
app.put("/api/characters/:id", editChar);
app.get("/api/episodes", getEps);

app.listen(port, () => console.log(`Listening on port ${port}`))