let patientModel = require("./patientModelNoRuleOut");
let labprocess = require("../handlers/api_functions/labprocess");

test("Check anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia"
        }
    })

})

test("Check microcytic anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 10;
    patient.lab.values.hemograma.vcm = 70

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Microcytic anemia"
        }
    })

})

test("Check iron deficiency anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check chronic disease anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check Sideroblastic anemia vs Talasemia anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check hemolytic anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check Posible bone marrow supresion anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check Chronic disease anemia, possibly related to chronic renal injury diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check Anemia, myelodysplasia probability diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 150;
    patient.lab.values.hemograma.plqt = 8;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, myelodysplasia probability"
        },
        thrombocytopenia: {
            title: "Extremely low platelets",
        }
    })

    patient.lab.values.hemograma.gb.count = 2;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Anemia, myelodysplasia probability"
        },
        thrombocytopenia: {
            title: "Extremely low platelets",
        },
        leucopenia: {
            title: "Low white blood cells",
            suggestion: "Request an appointment with a medical doctor"
        }
    })

})

test("Check Anemia, probable b12 deficiency diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check Anemia, probable folate deficiency diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

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

test("Check High vcm anemia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    console.log("macrocytic ", patient.lab)

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 8;
    patient.lab.values.hemograma.vcm = 150;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Macrocytic anemia"
        }
    })

})

test("Check low vcm without anemia", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 16;
    patient.lab.values.hemograma.vcm = 3;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Possible red blood cell or hemoglobin alteration"
        }
    })

})

test("Check high vcm without anemia", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.hb = 16;
    patient.lab.values.hemograma.vcm = 130;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        anemia: {
            title: "Possible red blood cell alteration"
        }
    })

})

test("Check high wbc with high neutrophils", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.gb.count = 20000;
    patient.lab.values.hemograma.gb.neu = 130;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        infection: {
            title: "Possible bacterian infection"
        }
    })

})

test("Check leucopenia", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.gb.count = 1;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        leucopenia: {
            title: "Low white blood cells"
        }
    })

})

test("Check low platelets", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.hemograma.plqt = 45000;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        thrombocytopenia: {
            title: "Very low platelets"
        }
    })

    patient.lab.values.hemograma.plqt = 10000;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        thrombocytopenia: {
            title: "Extremely low platelets"
        }
    })

})

test("Check Prerenal acute renal injury diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.renal.urea = 90;
    patient.lab.values.renal.creatinina = 2

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        renalInjury: {
            title: "Probable prerenal, renal injury"
        }
    })

})


test("Check renal renal injury diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.renal.urea = 90;
    patient.lab.values.renal.creatinina = 5

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        renalInjury: {
            title: "Probable renal, renal injury"
        }
    })

    patient.lab.values.renal.urea = 20;
    patient.lab.values.renal.creatinina = 5

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        renalInjury: {
            title: "Probable renal, renal injury"
        }
    })

})

test("Check hyonatremia diagnostic", () => {

    let patient = JSON.parse(JSON.stringify(patientModel));

    patient.lab.isPresent = true;
    patient.lab.values.ionograma.na = 130;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        hyponatremia: {
            title: "Low sodium"
        }
    })

    patient.lab.values.ionograma.na = 110;

    expect(labprocess.processh(patient.lab.values)).toMatchObject({
        hyponatremia: {
            title: "Very low sodium"
        }
    })

})


