const scorePatient = require("./api_functions/scorePatient");
const geolocate = require("./api_functions/findGeolocation");

const api_handler = {
    scorePatient,
    nearestHospital: geolocate.locateNearestHospital
}

module.exports = api_handler;