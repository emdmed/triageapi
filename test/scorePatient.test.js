const scorePatient = require("../handlers/api_functions/scorePatient");
const patientModelRuleOut = require("./patientModelRuleout");


test("Check ruleout", ()=>{

    const patient = patientModelRuleOut;

    expect(scorePatient(patient)).toBe(object)

})