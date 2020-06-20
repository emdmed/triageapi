const scorePatient = require("./api_functions/scorePatient");
const geolocate = require("./api_functions/findGeolocation");
const labprocess = require("./api_functions/labprocess");

const api_handler = {
    scorePatient,
    nearestHospital: geolocate.locateNearestHospital,
    labprocess
}

module.exports = api_handler;