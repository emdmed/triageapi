const score = require("./api_functions/scorePatient");
const geolocate = require("./api_functions/findGeolocation");
const labprocess = require("./api_functions/labprocess");
const validatePatient = require("./api_functions/validatePatient")
const managePatientId = require("./api_functions/managePatientId")

const api_handler = {
    score,
    validatePatient,
    managePatientId,
    nearestHospital: geolocate.locateNearestHospital,
    labprocess
}


module.exports = api_handler;