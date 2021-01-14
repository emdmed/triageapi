const score = require("../handlers/api_functions/scorePatient");
const patientModelRuleOut = require("./patientModelRuleout");
const patientModelNoRuleOut = require("./patientModelNoRuleOut")


test("Check ruleout only", ()=>{
    //score must be always 100
    let patient = JSON.parse(JSON.stringify(patientModelRuleOut));;
    expect(score.ruleOut(patient)).toMatchObject({
        score: 100
    })

})

test("Scoring ruleout integration test", ()=>{

    let patient = patientModelRuleOut;
    expect(score.scorePatient(patient)).toMatchObject({
        score: 100
    })

})

test("check age priorization", () => {
    let patient = patientModelNoRuleOut;
    patient.info.age = 18;
    expect(score.checkAgePriority(patient)).toMatchObject({
        score: 0
    })
    patient.info.age = 50
    expect(score.checkAgePriority(patient)).toMatchObject({
        score: 30
    })
    patient.info.age = 99
    expect(score.checkAgePriority(patient)).toMatchObject({
        score: 60
    })
})

test("Check Diagnose", () => {
    let patient = patientModelNoRuleOut;
    expect(score.diagnose(patient)).not.toBe({
        score: null
    })
    expect(score.diagnose(patient)).not.toBe({
        score: undefined
    })
    expect(score.diagnose(patient)).not.toBe({
        score: false
    })
    expect(score.diagnose(patient)).not.toBe({
        score: ""
    })
})