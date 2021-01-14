function validatePatient(patient, crypto) {

    if (!patient.info.age || patient.info.age === false || patient.info.age < 18) {
        console.log("Age error")
        throw new Error("Age error")
    }

    if (!patient) {
        console.log("Undefined error")
        throw new Error("Undefined problem")
    }

    return true

}




module.exports = validatePatient