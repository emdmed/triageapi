const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const db_handler =  require("./handlers/db_handler");
//const config = require("./config");

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
const api_route = require("./routes/api_route");
app.use("/api", api_route);

server.listen(process.env.PORT || 3000);
console.log("Server running...")