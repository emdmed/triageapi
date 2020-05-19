const mongoose = require("mongoose");

//SCHEMA
var accessRecord = mongoose.Schema({
    creation_date: {type: Number, required: true},
});

var accessRecord = module.exports = mongoose.model("TriagixAccessRecord", accessRecord);
        