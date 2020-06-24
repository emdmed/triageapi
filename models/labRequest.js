const mongoose = require("mongoose");

//SCHEMA
var labRequest = mongoose.Schema({
    creation_date: {type: String, required: true},
    labo: {type: Object, required: true}
});

var labRequest = module.exports = mongoose.model("labRequest", labRequest);
        