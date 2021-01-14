function validatePatient(patient, crypto) {

    if (!patient) {
        throw new Error("No patient object")
    }

    if (!patient.info.age || patient.info.age === false || patient.info.age < 18) {
        throw new Error("Age error")
    }

    return true

}

module.exports = validatePatient