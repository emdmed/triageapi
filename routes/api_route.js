const express = require('express');
const router = express.Router();
const api_handler = require("../handlers/api_handler");
const db_handler = require("../handlers/db_handler");
const api_key = "linkedin";
const patient_model = require("../patient_model.json");
const config = require("../config");
const crypto = require("crypto");


router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
})

router.post("/score", authorizeHeader, function (req, res) {
    console.log("Authorized, scoring...");
    let scoredPatient;
    let patient = req.body;
    console.log("Patient -> ", patient, patient.lab.hemograma)
    let validatedPatient;

    try {
        validatedPatient = validatePatient(res, patient)
    } catch (error) {
        res.send({ message: "Authorization error" }).status(200).end();
    }

    if (validatedPatient === true) {

        try {
            scoredPatient = api_handler.score.scorePatient(patient);
            console.log("SCORED ", scoredPatient)
        } catch (error) {
            res.send({ message: "Scoring error" }).status(200).end();
        }

        let sendPatient;
        try {
            sendPatient = cleanPatientToSend(scoredPatient);
            console.log("send patient ", sendPatient)
            res.send(sendPatient).status(200).end();
        } catch (error) {
            res.send({ message: "Patient cleaning error" }).status(200).end();
        }

    } else {
        res.status(400).send({ message: "Not authorized" }).end();
    }

})

//not checking if file exists
router.get("/patientModel", authorizeHeader, async function (req, res) {
    res.send(JSON.stringify(patient_model)).status(200).end();
});

router.post("/nearestHospital", authorizeHeader, async function (req, res) {
    let data = req.body;
    let nearestHospital;
    try {
        nearestHospital = await api_handler.nearestHospital(data);
        res.send(nearestHospital).status(200).end();
    } catch (error) {
        res.send({ message: "Finding nearest hospital error" })
        console.log(error)
    }

})

router.post("/labtest", async function (req, res) {
    let data = req.body;
    let dx;
    try{
        dx = await api_handler.labprocess.processh(data);
        res.send(dx).end();
    }catch(error){
        res.send({message: "Error processing laboratory"}).status(200).end();
    }
   
})


async function authorizeHeader(req, res, next) {
    let auth = req.headers.authorization;
    console.log(auth)
    if (auth === api_key) {

        if (config.environment.production === true) {
            await db_handler.createAccessRecord();
        } else { }

        next()
    } else {
        res.json({ message: "Sin autorización" }).end();
    }
}

function validatePatient(res, patient) {

    if (patient.info.age === undefined || patient.info.age === false || patient.info.age.toString().length < 2) {
        res.json({ message: "Missing patient age" }).end();
    } else if (patient === undefined) {
        res.json({ message: "Undefined problem" }).end();
    } else {
        return true;
    }
}

function cleanPatientToSend(patient) {
    console.log("LAB ", patient)

    let newPatient = {
        score: patient.score,
        age: patient.info.age,
        covidAlert: patient.info.covidAlert,
        date: new Date().getTime(),
        patientID: crypto.randomBytes(10).toString("hex"),
        nearestHospital: patient.nearestHospital,
    }

    if(patient.lab === false){

    } else {
        newPatient.lab = patient.lab
    }

    return newPatient;
}

module.exports = router;