function validatePatient(patient, crypto) {

    if (!patient.info || patient.info.age === false || patient.info.age.toString().length < 2) {
        throw error =  { message: "Missing patient age" }
    }

    if (patient === undefined) {
        return { message: "Undefined problem" }
    } 


}

module.exports = validatePatient