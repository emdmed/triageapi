const express = require('express');
const router = express.Router();
const api_handler = require("../handlers/api_handler");
const db_handler = require("../handlers/db_handler");
const api_key = "linkedin";
const patient_model = require("../patient_model.json");
const config = require("../config");
const crypto = require("crypto");



router.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
})

router.post("/score", authorizeHeader,  async function(req, res){
    console.log("Authorized, scoring...");
    let scoredPatient;
    let patient = req.body;
    let validatedPatient = await validatePatient(res, patient)

    if (validatedPatient === true){
        scoredPatient = await api_handler.scorePatient(patient);
        let sendPatient = await cleanPatientToSend(scoredPatient);
        res.send(sendPatient).status(200).end();
    } else {
        res.status(400).end();
    }

})

router.get("/patientModel", authorizeHeader, async function(req, res){
    res.send(JSON.stringify(patient_model)).status(200).end();
});

router.post("/nearestHospital", authorizeHeader, async function(req, res){
    let data = req.body;
    let nearestHospital = await api_handler.nearestHospital(data);
    res.send(nearestHospital);

})


async function authorizeHeader(req, res, next){
    let auth = req.headers.authorization;
    console.log(auth)
    if(auth === api_key){

        if(config.environment.production === true){
            await db_handler.createAccessRecord();
        } else {}

        next()
    } else {
        res.json({message: "Sin autorización"}).end();
    }
}

async function authorizeBody(req, res, next){
    let auth = req.body.authorization;
    if(auth === api_key){
        await db_handler.createAccessRecord();
        next()
    } else {
        res.json({message: "nope"}).end();
    }
}

function validatePatient(res, patient){

    if(patient.info.age === undefined || patient.info.age === false || patient.info.age.toString().length < 2){
        res.json({message: "Missing patient age"}).end();
    } else if (patient === undefined){
        res.json({message: "Undefined problem"}).end();
    } else {
        return true;
    }
}

function cleanPatientToSend(patient){
    console.log(crypto.randomBytes(10).toString("hex"))
    let newPatient = {
        score: patient.score,
        age: patient.info.age,
        covidAlert: patient.info.covidAlert,
        date: new Date().getTime(),
        patientID: crypto.randomBytes(10).toString("hex"),
        nearestHospital: patient.nearestHospital
    }

    return newPatient;
}

module.exports = router;