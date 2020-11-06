let patientModel = require("./patientModelNoRuleOut");
let labprocess = require("../handlers/api_functions/labprocess");

test("Check anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia"
        }
    })

})

test("Check microcytic anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;
    patient.lab.values.hemograma.vcm = 70

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Microcytic anemia"
        }
    })

})