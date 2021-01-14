const express = require('express');
const router = express.Router();
const crypto = require("crypto");

const api_handler = require("../handlers/api_handler");

const api_key = "linkedin";
const patient_model = require("../patient_model");

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
})

router.post("/score", authorizeHeader, function (req, res) {
    let scoredPatient;
    let patient = req.body;
    let validatedPatient;

    try {
        validatedPatient = api_handler.validatePatient(patient, crypto)
    } catch (error) {
        res.status(200).send({ message: "Validation error" }).end();
    }

    if (validatedPatient === true) {

        let idCheckedPatient = api_handler.managePatientId(patient, crypto)

        //Score
        try {
            scoredPatient = api_handler.score.scorePatient(idCheckedPatient.patient);
        } catch (error) {
            res.send({ message: "Scoring error" }).status(200).end();
        }

        //Sanitize
        let sendPatient;
        try {
            sendPatient = api_handler.cleanPatientToSend(scoredPatient, idCheckedPatient.uniqueID, crypto);
            res.send(sendPatient).status(200).end();
        } catch (error) {
            console.log(error)
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

    if (auth === api_key) {

        next()

    } else {
        res.json({ message: "Sin autorización" }).end();
    }
}

module.exports = router;