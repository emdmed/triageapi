const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config")
const db_handler =  require("./handlers/db_handler");

config.connectToDB();

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

//ROUTES
const api_route = require("./routes/api_route");
app.use("/api", api_route);

app.get("/", function(req, res){
    res.sendFile("TODO.md")
})

server.listen(process.env.PORT || 3000);
console.log("Server running...")
