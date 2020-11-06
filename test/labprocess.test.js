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

test("Check hemolytic anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 90
    patient.lab.values.hemograma.LDH = 500

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Hemolytic anemia"
        },
        anemia: {
            title: "Anemia"
        }
    })

    //add bi and haptoglobina testt when implemented

})

test("Check Posible bone marrow supresion anemia diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.plqt = 1;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Posible bone marrow supresion"
        },
        anemia: {
            title: "Anemia"
        }
    })

})

test("Check Chronic disease anemia, possibly related to chronic renal injury diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.renal.creatinina = 8;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Chronic disease anemia, possibly related to chronic renal injury"
        },
        anemia: {
            title: "Anemia"
        }
    })

})

test("Check Anemia, myelodysplasia probability diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 150;
    patient.lab.values.hemograma.plqt = 8;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, myelodysplasia probability"
        },
        thrombocytopenia: {
            title: "Very low platelets",
        }
    })

    patient.lab.values.hemograma.gb.count = 2;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, myelodysplasia probability"
        },
        thrombocytopenia: {
            title: "Very low platelets",
        },
        leucopenia: {
            title: "Low white blood cells",
            suggestion: "Request an appointment with a medical doctor"
        }
    })

})

test("Check Anemia, probable b12 deficiency diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 150;
    patient.lab.values.hemograma.b12 = 8;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, probable b12 deficiency"
        }
    })

})

test("Check Anemia, probable folate deficiency diagnostic", ()=>{

    let patient = patientModel;

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 150;
    patient.lab.values.hemograma.acidofolico = 4;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, probable folate deficiency"
        }
    })

})

