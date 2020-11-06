
//process ->  diagnosis
const lab = {
    processh,
}

//disable console log
//console.log = () => {}

const labModel = {
    hemograma: {
        hto: false,
        hb: 8,
        gb: {
            count: 3000,
            neu: 90,
            lin: false,
            mon: false,
            eos: false,
            bas: false
        },
        plqt: 50000,
        ferritina: 70,
        transferrina: 15,
        satTransferrina: false,
        TIBC: false,
        ferremia: 200,
        vcm: 50,
        rdw: 12,
        vsg: false,
        pcr: false,
        acidofolico: false,
        b12: false,
        LDH: false
    },
    renal: {
        urea: false,
        creatinina: false
    },
    ionograma: {
        na: false,
        k: false,
        cl: false,
        p: false,
        mg: false
    },
    eab: {
        ph: false,
        po2: false,
        pco2: false,
        hco3: false,
        eb: false,
        sato2: false
    },
    hepatograma: {
        bt: false,
        bd: false,
        bi: false,
        fal: false,
        tgo: false,
        tgp: false,
        amilasa: false,
        lipasa: false,
        gammagt: false,
        nucleot5: false,
        albumina: false,
        proteinas: false
    },
    coagulograma: {
        tp: false,
        kptt: false,
        RIN: false,
        factores: {
            XVIII: false,
            V: false
        }
    }

}

function getValues() {
    let values;
    return values = {
        hemograma: {
            hto: {
                min: {
                    h: 43,
                    m: 41
                }
            },
            hb: {
                unit: "gr/dl",
                min: {
                    h: 13,
                    m: 12
                }
            },
            gb: {
                count: {
                    min: 4500,
                    max: 11000
                },
                neu: {
                    unit: "%",
                    min: 55,
                    max: 70
                },
                lin: {
                    unit: "%",
                    min: 2,
                    max: 8
                },
                mon: {
                    unit: "%",
                    max: 8
                },
                eos: {
                    unit: "%",
                    max: 4
                },
                bas: {
                    unit: "%",
                    max: 1
                }
            },
            plqt: {
                min: 150000,
                max: 500000
            },
            ferritina: {
                unit: "ng/ml",
                max: 300,
                min: 15
            },
            transferrina: {
                unit: "mg/dl",
                min: 200,
                max: 400
            },
            satTransferrina: {
                unit: "%",
                min: 20,
                max: 50
            },
            TIBC: false,
            ferremia: {
                unit: "mg/dl",
                min: 50,
                max: 150
            },
            vcm: {
                unit: "fl",
                min: 80,
                max: 100
            },
            rdw: {
                max: 16
            },
            vsg: {
                max: {
                    unit: "mm/h",
                    h: 13,
                    m: 20
                }
            },
            pcr: false,
            acidofolicoSer: {
                unit: "ng/ml",
                min: 6,
                max: 20
            },
            acidofolicoEri: {
                unit: "ng/ml",
                min: 160,
                max: 700
            },
            b12: {
                unit: "ng/ml",
                min: 200,
                max: 900
            },
            haptoglobina: {
                unit: "mg/100ml",
                min: 27,
                max: 139
            },
            reticulocitos: {
                unit: "%",
                max: 2.5
            },
            LDH: {
                unit: "u/l",
                max: 280
            }
        },
        renal: {
            urea: {
                unit: "mg/dl",
                max: 45
            },
            creatinina: {
                unit: "mg/dl",
                max: 1.4
            }
        },
        ionograma: {
            na: {
                unit: false,
                min: 135,
                max: 145
            },
            k: {
                unit: false,
                min: 3.5,
                max: 5
            }
        }

    }
}

function processh(model) {
    console.log("processing")

    let values = getValues();

    //add algorythm keys here
    let modelDetection = {
        anemia: {
            isPresent: false,
            ironParameters: {
                ferremia: false,
                ferritina: false
            },
            hemolysisParameters: {
                LDH: false,
                BI: false,
                haptoglobina: false
            }
        },
        cytopenias: false,
        highLeucocytes: false,
        lowLeucocytes: false,
        highNeutrophils: false,
        plqt: false,
        renalInjury: {
            isPresent: false,
            hypoperfusion: false,
            glomerularInjury: false
        },
        hyponatremia: false,
        hypernatremia: false,
        hypokalemia: false,
        hyperkalemia: false
    }

    //HEMOGRAMA

    for (key in model.hemograma) {
        //hb
        if (key === "hb") {
            if(model.hemograma[key] === false || model.hemograma[key] === NaN || model.hemograma[key] === undefined || model.hemograma[key] === null){

            } else {
                if (model.hemograma[key] < values.hemograma.hb.min.h) {
                    console.log("->hemoglobina baja")
                    modelDetection.anemia.isPresent = true
                }

                if(model.hemograma.LDH === false || model.hemograma.LDH === undefined || model.hemograma.LDH === null ){

                } else{

                    if(model.hemograma.LDH > values.hemograma.LDH){
                        modelDetection.anemia.hemolysisParameters.LDH = true
                    }

                    //add BI parameter

                    //add haptoglobina parameter
                }
            }
        
        }
        //vcm
        if (key === "vcm") {
            if (model.hemograma[key] === false || model.hemograma[key] === NaN || model.hemograma[key] === undefined || model.hemograma[key] === null) {

            } else {
                if (model.hemograma[key] > values.hemograma.vcm.max) {
                    console.log("->vcm alto")
                    modelDetection.anemia.vcm = "high"
                } else if (model.hemograma[key] <= values.hemograma.vcm.min) {
                    console.log("->vcm bajo")
                    modelDetection.anemia.vcm = "low"
                }
            }
        }
        //rdw
        if (key === "rdw") {
            if (model.hemograma[key] === false || model.hemograma[key] === NaN || model.hemograma[key] === undefined || model.hemograma[key] === null) {

            } else {
                if (model.hemograma[key] < values.hemograma.rdw.max) {
                    console.log("->rdw normal")
                    modelDetection.anemia.rdw = "normal"
                } else if (model.hemograma[key] >= values.hemograma.rdw.max) {
                    console.log("->rdw alto")
                    modelDetection.anemia.rdw = "high"
                }
            }
        }
        //iron parametes
        //ferritina
        if (key === "ferritina") {
            if (model.hemograma[key] === false || model.hemograma[key] === NaN || model.hemograma[key] === undefined || model.hemograma[key] === null) {

            } else {
                if (model.hemograma[key] > values.hemograma.ferritina.max) {
                    console.log("->ferritina alta")
                    modelDetection.anemia.ironParameters.ferritina = "high"
                } else if (model.hemograma[key] < values.hemograma.ferritina.min) {
                    console.log("->ferritina baja")
                    modelDetection.anemia.ironParameters.ferritina = "low"
                } else {
                    modelDetection.anemia.ironParameters.ferritina = "normal"
                }
            }

        }
        //ferremia
        if (key === "ferremia") {
            if (model.hemograma[key] === false || model.hemograma[key] === NaN || model.hemograma[key] === undefined || model.hemograma[key] === null) {

            } else {
                if (model.hemograma[key] <= values.hemograma.ferremia.min) {
                    console.log("->ferremia baja")
                    modelDetection.anemia.ironParameters.ferremia = "low"
                } else if (model.hemograma[key] > values.hemograma.ferremia.max) {
                    console.log("->ferremia alta")
                    modelDetection.anemia.ironParameters.ferremia = "high"
                }
            }

        }
        //leucocitos
        if (key === "gb") {

            if (model.hemograma[key].count === false || model.hemograma[key].count === null || model.hemograma[key].count === undefined) {

            } else {
                if (model.hemograma[key].count < values.hemograma.gb.count.min) {
                    console.log("->leucocitos bajos", model.hemograma[key].count),
                        modelDetection.cytopenias = true;
                    modelDetection.lowLeucocytes = true
                } else if (model.hemograma[key].count > values.hemograma.gb.count.max) {
                    console.log("->Leococitos altos")
                    modelDetection.highLeucocytes = true;
                    if (model.hemograma[key].neu > values.hemograma.gb.neu.max) {
                        console.log("->Leococitos altos con desviacion a la izquierda")
                        modelDetection.highNeutrophils = true;
                    }
                }
            }
        }

        if (key === "plqt") {
            if (model.hemograma[key] === false || model.hemograma[key] === null || model.hemograma[key] === undefined) {

            } else {
                if (model.hemograma[key] < values.hemograma.plqt.min) {
                    console.log("->plaquetas bajas ", model.hemograma[key])
                    modelDetection.plqt = "low"
                    if (model.hemograma[key] < 50000) {
                        console.log("ALERTA plaquetas muy bajas")
                        modelDetection.plqt = "very low"
                    } else if (model.hemograma[key] < 30000) {
                        console.log("ALERTA! plaquetas extremadamente bajas")
                        modelDetection.plqt = "extremely low"
                    }
                }
            }

        }

        if (key === "b12") {
            if (model.hemograma[key] === false || model.hemograma[key] === null || model.hemograma[key] === undefined) {

            } else {
                if (model.hemograma[key] < values.hemograma.b12.min) {
                    console.log("->b12 baja ", model.hemograma[key])
                    modelDetection.anemia.b12 = "low"
                }
            }
        }


    }

    for (key in model) {
        if (key === "renal") {

            if (model[key].creatinina === false || model[key].creatinina === undefined || model[key].creatinina === null) {

            } else {
                if (+model[key].creatinina >= +values.renal.creatinina.max) {
                    console.log("renal injury true")
                    modelDetection.renalInjury.isPresent = true
                }
            }


            if (model[key].urea === false || model[key].urea === undefined || model[key].urea === null) {

            } else {
                if (model[key].urea >= values.renal.urea.max) {
                    //check creatinina
                    if (model[key].creatinina > values.renal.creatinina.max) {
                        //check creatinine urea relation
                        let crUrRelation = model[key].urea / model[key].creatinina
                        if (crUrRelation > 35) {
                            //hypoperfusion

                            modelDetection.renalInjury.hypoperfusion = true;
                        } else if (crUrRelation < 20) {
                            //glomerular Injury

                            modelDetection.renalInjury.glomerularInjury = true;
                        }

                    }
                }
            }

        }

        if (key === "ionograma") {
            if (model[key].na === false || model[key].na === null || model[key].na === undefined) {

            } else {
                if (model[key].na < values.ionograma.na.min) {
                    modelDetection.hyponatremia = "low"
                } else if (model.hemograma[key] < 120) {
                    modelDetection.hyponatremia = "very low"
                }

                if (model[key].na > values.ionograma.na.max) {
                    modelDetection.hypernatremia = true;
                }
            }

            if (model[key].k === false || model[key].k === null || model[key].k === undefined) {
                if (model[key].k < values.ionograma.k.min) {
                    modelDetection.hypokalemia = "low"
                } else if (model[key].k < 3) {
                    console.log(model[key].k)
                    modelDetection.hypokalemia = "very low"
                } else if (model[key].k === false || model[key].k === NaN) {
                    modelDetection.hypokalemia = false
                }

                if (model[key].k > values.ionograma.k.max) {
                    modelDetection.hyperkalemia = "high"
                } else if (model[key].k > 6) {
                    modelDetection.hyperkalemia = "very high"
                }
            }
        }
    }
    console.log("MODEL DETECTION ", modelDetection)
    //Diagnostic algorythm
    let diagnosis = diagnose(modelDetection);
    console.log("DIAGNOSIS ", diagnosis)
    return diagnosis;

}

function diagnose(model) {

    let diagnosis = {}

    if (model.anemia.isPresent === true) {
        if (model.anemia.vcm === "low") {
            //check iron studies
            if (model.anemia.ironParameters.ferremia === false || model.anemia.ironParameters.ferritina === false) {
                console.log("Microcytic anemia, request iron parameters")
                diagnosis.anemia = { title: "Microcytic anemia", suggestion: "Request iron parameters" }
            } else if (model.anemia.ironParameters.ferritina === "low" && model.anemia.ironParameters.ferremia === "low") {
                console.log("anemia ferropenica")
                diagnosis.anemia = { title: "Iron deficiency anemia", suggestion: "Request an appointment with a medical doctor" }
            } else if (model.anemia.ironParameters.ferremia === "low" && model.anemia.ironParameters.ferritina === "high" || model.anemia.ironParameters.ferritina === "normal" && model.anemia.ironParameters.ferremia === "low") {
                console.log("Anemia de los trastornos cronicos")
                diagnosis.anemia = { title: "Chronic disease anemia", suggestion: "Request an appointment with a medical doctor" }
            } else if (model.anemia.ironParameters.ferremia === "high" && model.anemia.ironParameters.ferritina === "normal" || model.anemia.ironParameters.ferritina === "high") {
                console.log("Anemia sideroblastca vs talasemia")
                diagnosis.anemia = { title: "Sideroblastic anemia vs Talasemia", suggestion: "Request an appointment with a hematologist doctor" }
            }
        } else if (model.anemia.vcm === "normal") {
            //check for hemolysis
            if (model.anemia.hemolysisParameters.LDH === true || model.anemia.hemolysisParameters.bi === true || model.anemia.hemolysisParameters.haptoglobina === true) {
                console.log("Anemia hemolitica")
                diagnosis.anemia = { title: "Hemolytic anemia", suggestion: "Go to you nearest hospital or ask for at home medical assistance" }
            }
            //check for bone marrow supression
            if (!model.cytopenias) {

            } else if (model.plqt === "low" || model.lowLeucocytes === true) {
                console.log("Supresion de medula osea")
                diagnosis.anemia = { title: "Posible bone marrow supresion anemia", suggestion: "Go to you nearest hospital or ask for at home medical assistance" }
            }
            //check for renal insufficiency
            if (model.renal) {
                if (model.renal.cr === "high") {
                    console.log("Posible insuficiencia renal cronica");
                    diagnosis.anemia = { title: "Chronic disease anemia, possibly related to chronic renal injury", suggestion: "Request an appointment with a medical doctor" }
                }
            }
        } else if (model.anemia.vcm === "high") {
            //check for cytopenias
            if (model.cytopenias === true || model.plqt === "low" || model.plqt === "very low") {
                console.log("Posible sindrome mielodisplasico")
                diagnosis.anemia = { title: "Anemia, myelodysplasia probability", suggestion: "Request an appointment with a medical doctor" }
            }
            //check b12 and folate
            if (model.anemia.b12 === "low") {
                console.log("Deficiencia de B12")
                diagnosis.anemia = { title: "Anemia, probable b12 deficiency", suggestion: "Go to you nearest hospital or ask for at home medical assistance" }
            }
            if (model.anemia.acfolico === "low") {
                console.log("Deficiencia de folatos");
                diagnosis.anemia = { title: "Anemia, probablemente folate deficiency", suggestion: "Request an appointment with a medical doctor" }
            }
        } else {
            diagnosis.anemia = { title: "Anemia", suggestion: "Request an appointment with a medical doctor" }
        }

    } else if (model.anemia.isPresent === false) {
        if (model.anemia.vcm === "low") {
            diagnosis.anemia = { title: "Possible red blood cell or hemoglobin alteration", suggestion: "Request an appointment with a medical doctor" }
        } else if (model.anemia.vcm === "high") {
            diagnosis.anemia = { title: "Possible red blood cell alteration", suggestion: "Request an appointment with a medical doctor" }
        }
    }

    if (model.highLeucocytes === true && model.highNeutrophils === true) {
        diagnosis.infection = { title: "Possible bacterian infection", suggestion: "if fever consult with a medical doctor" }
    }

    if (model.lowLeucocytes === true) {
        diagnosis.leucopenia = { title: "Low white blood cells", suggestion: "Request an appointment with a medical doctor" }
    }

    if (model.plqt === "low") {
        diagnosis.thrombocytopenia = { title: "Low platelets", suggestion: "Request an appointment with a medical doctor" }
    }

    if (model.plqt === "very low") {
        diagnosis.thrombocytopenia = { title: "Very low platelets", suggestion: "Consult at the emergency ward" }
    }

    if (model.plqt === "extremely low") {
        diagnosis.thrombocytopenia = { title: "Extremely low platelets", suggestion: "Ask for an ambulance" }
    }

    //renal
    if (model.renalInjury.isPresent === true) {
        if (model.renalInjury.hypoperfusion === true) {
            diagnosis.injuriaRenal = { title: "Prerenal acute renal injury", suggestion: "Request an appointment with a medical doctor righ away or consult to the emergency ward" }
        }

        if (model.renalInjury.glomerularInjury === true) {
            diagnosis.injuriaRenal = { title: "Renal acute renal injury", suggestion: "Request an appointment with a medical doctor righ away or consult to the emergency ward" }
        }
    }


    //ionograma
    if (model.hyponatremia === "low") {
        diagnosis.hyponatremia = { title: "Low sodium", suggestion: "Request an appointment with a medical doctor " }
    } else if (model.hyponatremia === "very low") {
        diagnosis.hyponatremia = { title: "very low sodium", suggestion: "Request an appointment with a medical doctor righ away or consult to the emergency ward" }
    }

    if (model.hypernatremia === true) {
        diagnosis.hypernatremia = { title: "High sodium", suggestion: "Request an appointment with a medical doctor " }
    }

    /* PROBLEM IN VERY LOW HYPOKALEMIA
    if(model.hypokalemia === "low"){
        diagnosis.hypokalemia = {title: "Potasio bajo", suggestion: "Consulte a su médico clínico"}
    } else if(model.hypokalemia = "very low"){
        console.log(model.hypokalemia)
        diagnosis.hypokalemia = {title: "Potasio muy bajo", suggestion: "Consulte urgente a la guardia"}
    }

    if(model.hyperkalemia === "high"){
        diagnosis.hyperkalemia = {title: "Potasio alto", suggestion: "Consulte a su médico clínico"};
    } else if(model.hyperkalemia === "very high"){
        diagnosis.hyperkalemia = {title: "Potasio muy alto", suggestion: "Consulte urgente a la guardia"}
    }*/

    //return diagnosis here
    console.log(diagnosis)
    return diagnosis
}

module.exports = lab
