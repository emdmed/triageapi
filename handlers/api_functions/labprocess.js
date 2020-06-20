const lab = {
    processh
}

const labModel = {
        hemograma : {
            hto: false,
            hb: 8,
            gb: {
                count: false,
                neu: false,
                lin: false,
                mon: false,
                eos: false,
                bas: false
            },
            plqt: false,
            ferritina: 50,
            transferrina: 15,
            satTransferrina: false,
            TIBC: false,
            ferremia: 2,
            vcm: 50,
            rdw: 12,
            vsg: false,
            pcr: false,
            acidofolico: false,
            b12: false
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

const values = {
        hemograma : {
            hto: {
                min: {
                    h: 43,
                    m: 41
                }
            },
            hb: {
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
                mac: 500000
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
            }
        }
    
}



function processh(model, values){
    console.log("processing")

    //add algorythm keys here
    let modelDetection = {
        anemia: {
            isPresent: false,
            ironParameters: {
                ferremia: false,
                ferritina: false
            }
        }
    }

    //HEMOGRAMA

    for(key in model.hemograma){
        //hb
        if(key === "hb"){
            if(model.hemograma[key] <= values.hemograma.hb.min.h){
                console.log("->hemoglobina baja")
                modelDetection.anemia.isPresent = true
            }
        }
        //vcm
        if(key === "vcm"){
            if(model.hemograma[key] === false){
            
            } else if(model.hemograma[key] > values.hemograma.vcm.max){
                console.log("->vcm alto")
                modelDetection.anemia.vcm = "high"
            } else if (model.hemograma[key] <= values.hemograma.vcm.min){
                console.log("->vcm bajo")
                modelDetection.anemia.vcm = "low"
            }
        }
        //rdw
        if(key === "rdw"){
            if(model.hemograma[key] === false){
              
            } else if (model.hemograma[key] < values.hemograma.rdw.max) {
                console.log("->rdw normal")
                modelDetection.anemia.rdw = "normal"
            } else if (model.hemograma[key] >= values.hemograma.rdw.max){
                console.log("->rdw alto")
                modelDetection.anemia.rdw = "high"
            }
        }
        //iron parametes
        //ferritina
        if(key === "ferritina"){
            if(model.hemograma[key] === false){

            } else if (model.hemograma[key] > values.hemograma.ferritina.max){
                console.log("->ferritina alta")
                modelDetection.anemia.ironParameters.ferritina = "high"
            } else if (model.hemograma[key] > values.hemograma.ferritina.min){
                console.log("->ferritina baja")
                modelDetection.anemia.ironParameters.ferritina = "low"
            }
        }
        //ferremia
        if(key === "ferremia"){
            if(model.hemograma[key] === false){

            } else if (model.hemograma[key] <= values.hemograma.ferremia.min){
                console.log("->ferremia baja")
                modelDetection.anemia.ironParameters.ferremia = "low"
            } else if (model.hemograma[key] > values.hemograma.ferritina.max){
                console.log("->ferremia alta")
                modelDetection.anemia.ironParameters.ferremia = "high"
            }
        }

    }


    console.log(modelDetection)

    //Diagnostic algorythm
    diagnose(modelDetection);

}

function diagnose(model){

    let diagnosis = {}

    if(model.anemia.isPresent === true){
        if(model.anemia.vcm === "low"){
            //check iron studies
            if(model.anemia.ironParameters.ferremia === false || model.anemia.ironParameters.ferritina === false){
                console.log("anemia microcitica, pedir parametros de hierro")
                diagnosis.anemia = {title: "Anemia Microcitica", suggestion: "Solicitar parametros de hierro"}
            } else if(model.anemia.ironParameters.ferritina === "low" && model.anemia.ironParameters.ferremia === "low"){
                console.log("anemia ferropenica")
                diagnosis.anemia = {title: "Anemia Ferropenica", suggestion: "Solicitar turnos con médico clínico o hematólogo"}
            } else if(model.anemia.ironParameters.ferremia === "low" && model.anemia.ironParameters.ferritina === "high" || model.anemia.ironParameters.ferritina === "normal"){
                console.log("Anemia de los trastornos cronicos")
                diagnosis.anemia = {title: "Anemia de los Trastornos Crónicos", suggestion: "Solicitar turno con médico clínico"}
            } else if (model.anemia.ironParameters.ferriemia === "high" && model.anemia.ironParameters.ferritina === "normal" || model.anemia.ironParameters.ferritina === "high"){
                console.log("Anemia sideroblastca vs talasemia")
                diagnosis.anemia = {title: "Anemia sideroblástica vs Talasemia", suggestion: "Solitictar turno con médico hematólogo"}
            }
        }
    }

    console.log(diagnosis)
}

processh(labModel, values)


