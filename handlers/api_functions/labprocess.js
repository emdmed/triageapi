//process ->  diagnosis
const lab = {
    processh,
}

const labModel = {
        hemograma : {
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

function getValues(){
    let values;
    return  values = {
        hemograma : {
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
            },
            LDH: {
                unit: "u/l",
                max: 280
            }
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
            },
            LDH: {
                unit: "u/l",
                max: 280
            }
        }
    
}



function processh(model){
    console.log("processing")
    let values = getValues();

    //add algorythm keys here
    let modelDetection = {
        anemia: {
            isPresent: false,
            ironParameters: {
                ferremia: false,
                ferritina: false
            }
        },
        cytopenias: false,
        highLeucocytes: false,
        lowLeucocytes: false,
        highNeutrophils: false,
        plqt: false
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
            } else if (model.hemograma[key] < values.hemograma.ferritina.min){
                console.log("->ferritina baja")
                modelDetection.anemia.ironParameters.ferritina = "low"
            } else {
                modelDetection.anemia.ironParameters.ferritina = "normal"
            }
        }
        //ferremia
        if(key === "ferremia"){
            if(model.hemograma[key] === false){

            } else if (model.hemograma[key] <= values.hemograma.ferremia.min){
                console.log("->ferremia baja")
                modelDetection.anemia.ironParameters.ferremia = "low"
            } else if (model.hemograma[key] > values.hemograma.ferremia.max){
                console.log("->ferremia alta")
                modelDetection.anemia.ironParameters.ferremia = "high"
            }
        }
        //leucocitos
        if(key === "gb"){
            if(model.hemograma[key].count === false){

            } else if (model.hemograma[key].count < values.hemograma.gb.count.min){
                console.log("->leucocitos bajos")
                modelDetection.cytopenias = true;
                modelDetection.lowLeucocytes = true
            } else if (model.hemograma[key].count > values.hemograma.gb.count.max){
                console.log("->Leococitos altos")
                modelDetection.highLeucocytes = true;
                if(model.hemograma[key].neu > values.hemograma.gb.neu.max){
                    console.log("->Leococitos altos con desviacion a la izquierda")
                    modelDetection.highNeutrophils = true;
                }
            }
        }

        if(key === "plqt"){
            if(model.hemograma[key] < values.hemograma.plqt.min){
                console.log("->plaquetas bajas")
                modelDetection.plqt = "low"
                if(model.hemograma[key] < 50000){
                    console.log("ALERTA plaquetas muy bajas")
                    modelDetection.plqt = "very low"
                } else if(model.hemograma[key] < 30000){
                    console.log("ALERTA! plaquetas extremadamente bajas")
                    modelDetection.plqt = "extremely low"
                }
            }
        }

    }


    console.log(modelDetection)

    //Diagnostic algorythm
    let diagnosis = diagnose(modelDetection);
    return diagnosis;

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
            } else if(model.anemia.ironParameters.ferremia === "low" && model.anemia.ironParameters.ferritina === "high" || model.anemia.ironParameters.ferritina === "normal" &&  model.anemia.ironParameters.ferremia === "low"){
                console.log("Anemia de los trastornos cronicos")
                diagnosis.anemia = {title: "Anemia de los Trastornos Crónicos", suggestion: "Solicitar turno con médico clínico"}
            } else if (model.anemia.ironParameters.ferremia === "high" && model.anemia.ironParameters.ferritina === "normal" || model.anemia.ironParameters.ferritina === "high"){
                console.log("Anemia sideroblastca vs talasemia")
                diagnosis.anemia = {title: "Anemia sideroblástica vs Talasemia", suggestion: "Solitictar turno con médico hematólogo"}
            }
        } else if(model.anemia.vcm === "normal"){
            //check for hemolysis
            if(model.hemolysis){
                console.log("Anemia hemolitica")
                diagnosis.anemia = {title: "Anemia Hemolitica", suggestion: "Dirijase hacia la guardia mas cercana con su laboratorio"}
            }
            //check for bone marrow supression
            if(!model.cytopenias){

            } else if (model.plqt === "low" || model.lowLeucocytes === true){
                console.log("Supresion de medula osea")
                diagnosis.anemia = {title: "Anemia con posible supresion de medula osea", suggestion: "Dirijase hacia la guardia mas cercana con su laboratorio"}
            }
            //check for renal insufficiency
            if(model.renal){
                if(model.renal.cr === "high"){
                    console.log("Posible insuficiencia renal cronica");
                    diagnosis.anemia = {title: "Anemia de los trastornos cronicos, posiblemente asociada a alteración renal", suggestion: "Solicite turno con su médico clínico o dirijase a la guardia mas cercana"}
                }
            }
        } else if (model.anemia.vcm === "high"){
            //check for cytopenias
            if(model.cytopenias.leucocitos === "low" || model.plqt === "low"){
                console.log("Posible sindrome mielodisplasico")
                diagnosis.anemia = {title: "Anemia, probable mielodisplasia", suggestion: "Dirijase hacia la guardia mas cercana con su laboratorio"}
            }
            //check b12 and folate
            if(model.anemia.b12 === "low"){
                console.log("Deficiencia de B12")
                diagnosis.anemia = {title: "Anemia, probable deficit de b12", suggestion: "Dirijase hacia la guardia mas cercana con su laboratorio"}
            }
            if(model.anemia.acfolico === "low"){
                console.log("Deficiencia de folatos");
                diagnosis.anemia = {title: "Anemia, probablemente por deficit de folatos", suggestion: "Saque turno con su hematólogo"}
            }
        } else {
            diagnosis.anemia = {title: "Anemia", suggestion: "Consulte con su médico clínico"}
        }

    }else if (model.anemia.isPresent === false){
        if(model.anemia.vcm === "low"){
            diagnosis.anemia = {title: "Posible alteracion de los globulos rojos o hemoglobina", suggestion: "Consulte a su médico clínico o hematólogo"}
        }
    }

    if(model.highLeucocytes === true && model.highNeutrophils === true){
        diagnosis.infection = {title: "Posible infección bacteriana", suggestion: "Si tiene o tuvo fiebre consulte a la guardia"}
    }

    if(model.lowLeucocytes === true){
        diagnosis.leucopenia = {title: "Globulos blancos bajos", suggestion: "Consulte a su médico clínico"}
    }

    if(model.plqt === "low"){
        diagnosis.plaquetopenia = {title: "Plaquetas bajas", suggestion: "Consulte a su médico clínico"}
    }

    if(model.plqt === "very low"){
        diagnosis.plaquetopenia = {title: "Plaquetas muy bajas", suggestion: "Consulte a la guardia"}
    }

    if(model.plqt === "extremely low"){
        diagnosis.plaquetopenia = {title: "Plaquetas extremedamente bajas", suggestion: "Consulte urgente a la guardia"}
    }

    console.log(diagnosis)
    //return diagnosis here
    return diagnosis
}

//processh(labModel, values)

module.exports = lab
