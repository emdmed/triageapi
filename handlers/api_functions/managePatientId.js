function managePatientId(patient, crypto){

    function encryptUniquePatientID(string, algo){
        console.log("UNIQUE ID ", "String", string, "Algo", algo)
    
        let hashed = crypto.createHash(algo).update(string).digest('hex');
        return hashed;
        
    }

    //check configs
    for (key in patient.config) {
        if (key === "uniqueIdEncryption") {
            console.log("unique encryption config key exists")
            if (patient.info.hashString === false || patient.info.hashString === "") {
                console.log("No hashString key in patient info")
            } else {
                try {
                    uniqueID = encryptUniquePatientID(patient.info.hashString, patient.config.uniqueIdEncryption)
                } catch (error) {
                    console.log("Error in trying to hash hashString in patient info")
                }
            }
        }
    }

    return patient
}

module.exports = managePatientId