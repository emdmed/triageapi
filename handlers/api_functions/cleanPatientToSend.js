function cleanPatientToSend(patient, uniqueID) {

    let newPatient = {
        score: patient.score,
        age: patient.info.age,
        covidAlert: patient.info.covidAlert,
        date: new Date().getTime(),
        nearestHospital: patient.nearestHospital,
    }

    if(uniqueID){
        console.log("UNIQUE ID")
        newPatient.patientID = uniqueID;
    } else {
        console.log("NO UNIQUE ID")
        newPatient.patientID = crypto.randomBytes(10).toString("hex");
    }

    if(patient.lab === false){

    } else {
        newPatient.lab = patient.lab
    }

    return newPatient;
}

module.exports = cleanPatientToSend