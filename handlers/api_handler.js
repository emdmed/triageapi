const score = require("./api_functions/scorePatient");
const geolocate = require("./api_functions/findGeolocation");
const labprocess = require("./api_functions/labprocess");

const api_handler = {
    score,
    nearestHospital: geolocate.locateNearestHospital,
    labprocess
}

module.exports = api_handler;