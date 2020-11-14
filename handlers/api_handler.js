const score = require("./api_functions/scorePatient");
const geolocate = require("./api_functions/findGeolocation");
const labprocess = require("./api_functions/labprocess");
const crypto = require("crypto");

const api_handler = {
    score,
    nearestHospital: geolocate.locateNearestHospital,
    labprocess,
    encryptUniquePatientID
}

function encryptUniquePatientID(string, algo){
    console.log("UNIQUE ID ", "String", string, "Algo", algo)

    let hashed = crypto.createHash(algo).update(string).digest('hex');
    return hashed;
    
}

module.exports = api_handler;