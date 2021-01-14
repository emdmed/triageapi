const express = require('express');
const router = express.Router();
const path = require("path")
const api_handler = require("../handlers/api_handler");
const db_handler = require("../handlers/db_handler");
const patient_model = require("../patient_model");
const config = require("../config");
const crypto = require("crypto");

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
})

router.get("/", function(req, res){
    console.log("ebadge")
    res.sendFile(path.join(__dirname, "../client", "/ebadge.html"))
})

router.get("/provider", async function (req, res){
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../client", "/ebadgeEmergency.html"))
})


router.get("/em", async function (req, res){
    let data = req.query
    console.log(data)
    res.redirect(`/ebadge/provider?id=${data.id}&insurance=${data.insurance}`)
})

module.exports = router;