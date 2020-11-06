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

test("Check iron deficiency anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;
    patient.lab.values.hemograma.vcm = 70
    patient.lab.values.hemograma.ferritina = 2;
    patient.lab.values.hemograma.ferremia = 2;
    patient.lab.values.hemograma.satTransferrina = 1;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Iron deficiency anemia"
        }
    })

})

test("Check chronic disease anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;
    patient.lab.values.hemograma.vcm = 70
    patient.lab.values.hemograma.ferritina = 700;
    patient.lab.values.hemograma.ferremia = 2;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Chronic disease anemia"
        }
    })

    patient.lab.values.hemograma.ferritina = 250;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Chronic disease anemia"
        }
    })

})

test("Check Sideroblastic anemia vs Talasemia anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;
    patient.lab.values.hemograma.vcm = 70
    patient.lab.values.hemograma.ferritina = 250;
    patient.lab.values.hemograma.ferremia = 500;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Sideroblastic anemia vs Talasemia"
        }
    })

    patient.lab.values.hemograma.ferritina = 700;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Sideroblastic anemia vs Talasemia"
        }
    })

})