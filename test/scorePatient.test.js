const score = require("../handlers/api_functions/scorePatient");
const patientModelRuleOut = require("./patientModelRuleout");


test("Check ruleout", ()=>{
    //score must be always 100
    let patient = patientModelRuleOut;

    expect(score.ruleOut(patient)).toMatchObject({
        score: 100
    })

})

test("Check ruled out patient through full scorePatient", ()=>{

    let patient = patientModelRuleOut;

    expect(score.ruleOut(patient)).toMatchObject({
        score: 100
    })

})