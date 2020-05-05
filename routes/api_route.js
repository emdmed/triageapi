const express = require('express');
const router = express.Router();
const api_handler = require("../handlers/api_handler");
const api_key = "lauti"

router.post("/score", authorize,  async function(req, res){
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

async function authorize(req, res, next){
    let auth = req.headers.authorization;
    if(auth === api_key){
        next()
    } else {
        res.json({message: "nope"}).end();
    }
}

function validatePatient(res, patient){
    if(patient.info.phone === undefined || patient.info.phone === false || patient.info.phone.toString().length < 8){
        res.json({message: "Missing patient phone"}).end();
    } else if(patient.info.age === undefined || patient.info.age === false || patient.info.age.toString().length < 2){
        res.json({message: "Missing patient age"}).end();
    } else if (patient === undefined){
        res.json({message: "Undefined problem"}).end();
    } else {
        return true;
    }
}

function cleanPatientToSend(patient){
    let newPatient = {
        score: patient.score,
        age: patient.info.age,
        covidAlert: patient.info.covidAlert,
        date: new Date().getTime(),
        patientID: patient.info.number
    }

    return newPatient;
}


module.exports = router;