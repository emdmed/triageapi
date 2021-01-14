const findGeolocation = require("../handlers/api_functions/findGeolocation");
const patientModelRuleOut = require("./patientModelRuleout");
const patientModelNoRuleOut = require("./patientModelNoRuleOut");

test("Find nearest hospital", () => {

    let patient = JSON.parse(JSON.stringify(patientModelNoRuleOut));;
    patient.info.geolocation.lat = -34.671969;
    patient.info.geolocation.lng = -58.394289;
    
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).toMatchObject({
        hospital: "Hospital Penna"
    })
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).not.toBe({
        distance: null
    })
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).not.toBe({
        distance: NaN
    })
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).not.toBe({
        distance: undefined
    })
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).not.toBe({
        distance: false
    })
    expect(findGeolocation.locateNearestHospital(patient.info.geolocation)).not.toBe({
        distance: ""
    })
})

//-34.671969, -58.394289