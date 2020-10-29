const score = require("../handlers/api_functions/scorePatient");
const patientModelRuleOut = require("./patientModelRuleout");


test("Check ruleout", ()=>{

    const patient = patientModelRuleOut;

    expect(score.ruleOut(patient)).toBe({
        score: 100,
        age: Number,
        covidAlert: false,
        date: Number,
        patientID: String
    })

})