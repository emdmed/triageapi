const mongoose = require("mongoose");

//SCHEMA
var accessRecord = mongoose.Schema({
    creation_date: {type: Date, required: true},
});

var accessRecord = module.exports = mongoose.model("TriagixAccessRecord", accessRecord);
        