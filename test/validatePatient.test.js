let patientModel = require("./patientModelNoRuleOut");
let validatePatient = require("../handlers/api_functions/validatePatient")

test("Check no age patient", ()=>{
    //score must be always 100
    let patient = JSON.parse(JSON.stringify(patientModel));
    patient.info.age = false

    expect(validatePatient("res", patient)).toMatchObject(
        { message: "Missing patient age" }
    )

})