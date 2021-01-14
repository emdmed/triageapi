function managePatientId(patient, crypto){
    let uniqueID
    function encryptUniquePatientID(string, algo){
        let hashed = crypto.createHash(algo).update(string).digest('hex');
        return hashed; 
    }

    //check configs
    for (key in patient.config) {
        if (key === "uniqueIdEncryption") {
            if (patient.info.hashString === false || patient.info.hashString === "" || !patient.info.hashString) {
                console.log("No hashString key in patient info")
            } else {
                try {
                    uniqueID = encryptUniquePatientID(patient.info.hashString, patient.config.uniqueIdEncryption)
                    console.log("uniqueid",uniqueID)
                } catch (error) {
                    console.log("Error in trying to hash hashString in patient info")
                    console.log(error)
                }
            }
        }
    }

    return {patient, uniqueID}
}

module.exports = managePatientId