const mongoose = require("mongoose");

//SCHEMA
var ApiKeyGen = mongoose.Schema({
    creation_date: {type: Date, required: true},
    email: {type: String, required: true},
    apiKey: {type: String, required: true}
});

var ApiKeyGen = module.exports = mongoose.model("TriagixAPIKeys", ApiKeyGen);
        