const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config")
const fs = require("fs");

//disable console logs
//console.log = () => {}

//config
config.environment.set();
config.connectToDB();

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

//ROUTES
const api_route = require("./routes/api_route");
app.use("/api", api_route);
const ebadge_route = require("./routes/ebadgeRoute");
app.use("/ebadge", ebadge_route);

app.get("/", function(req, res){
    res.sendFile("index.html")
})

app.get("/triagejs", function(req, res){
    res.sendFile(__dirname + "/client/triagejs.js")
})

server.listen(process.env.PORT || 3000);
console.log("Running on port " + 3000)
