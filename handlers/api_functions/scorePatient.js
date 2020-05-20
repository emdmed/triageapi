const scorePatient = (patient)=>{

    console.log("Scoring...");

    //rule out
    for(key in patient.ruleOut){
        //console.log(patient.ruleOut[key])
        if(patient.ruleOut[key] === true){
            console.log("patient ruled out! because: ", key, " is true");
                patient.score = 100;
                return patient;
        }
    }

    //check age priority
    if(patient.info.age >= 40 && patient.info.age < 70){
        patient.score = 30;
    } else if (patient.info.age >= 18 && patient.info.age < 40){
        patient.score = 0;
    } else if (patient.info.age > 70){
        patient.score = 60;
    }

    diagnose(patient);

    return patient;
}

function diagnose(patient){
    console.log("diagnosing...");
    let score = patient.score;

    //Abdominal 

    //Abdomen agudo medico/quirurgico (esto tiene que estar antes que los otros cuadros abdominales)
    if(patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.fever.isPresent === true){
        console.log("Abdomen agudo");
        patient.score = 70;
    }

    //apendicitis
    if(patient.symptoms.fever.isPresent === true && patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.seven == true){
        console.log("apendicitis");
        patient.score = 70; 
    }

    //colecistitis
    if(patient.symptoms.fever.isPresent === true && patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.one == true){
        console.log("colecistitis");
        let score = patient.score;
        patient.score = score + 15;

    } else if(patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.one == true){
        console.log("colecistitis, sin fiebre");
        let score = patient.score;
        patient.score = score + 7;
    }

    //Infecciones respiratorias
    //faringitis-laringitis
    if(patient.symptoms.throatPain.isPresent === true){
        if(patient.symptoms.fever.isPresent === true){
            patient.score = score + 2
            console.log("Fever + ")
        } else if (patient.symptoms.fever.isPresent === false){
            patient.score = score + 1
        }

        if(patient.symptoms.throatPain.voiceChange === false){
            console.log("faringitis");
        } else if (patient.symptoms.throatPain.voiceChange === true){
            console.log("laringitis");
        }
    } 

    //CVAS
    if(patient.symptoms.throatPain.isPresent === true && patient.symptoms.fever.isPresent === true){
        patient.score = score + 3
        patient.info.covidAlert = true
    }

    //infeccion respiratoria baja
    if(patient.symptoms.fever.isPresent === true && patient.symptoms.cough.isPresent === true){
        console.log("respiratory infection")
        patient.score = score + 15;
        patient.info.covidAlert = true
    }

    //infeccion urinaria baja/alta
    if(patient.symptoms.urinatingPain.isPresent == true && patient.symptoms.fever.isPresent === false){
        console.log("infeccion urinaria baja")
        patient.score = score + 3;
    } else if (patient.symptoms.urinatingPain.isPresent == true && patient.symptoms.fever.isPresent === true){
        console.log("infeccion urinaria alta o complicada");
        patient.score = score + 10;
    }

    //Generalidades urgentes (escapan ruleOut inicial, no son tan urgentes pero tienen que ser vistos lo antes posible)
    //TVP
    if(patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.rightLeg === true || patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.leftLeg === true ){
        console.log("TVP");
        patient.score = 85;
    }

    //ICC descompensada
    if(patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.rightLeg === true && patient.symptoms.edema.location.leftLeg === true && patient.symptoms.cough.isPresent === true){
        console.log("ICC descompensada?");
        patient.score = score + 20;
    }

    //Alergia
    if(patient.symptoms.cough.isPresent === true && patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.face){
        console.log("Alergia");
        patient.score = 75;
    }

    //Generalidades de prioridad variable
    //Gastroenteritis
    if(patient.symptoms.fever.isPresent === true && patient.symptoms.diarrhea.isPresent === true){
        console.log("Enteritis/gastroenteritis")
        patient.score = score + 15;
    } else if (patient.symptoms.fever.isPresent === true && patient.symptoms.diarrhea.isPresent === true && patient.symptoms.vomiting.isPresent === true){
        console.log("Gastroenteritis, riesgo de deshidratación");
        patient.score = score + 20;
    } else if (patient.symptoms.diarrhea.isPresent === true && patient.symptoms.vomiting.isPresent === true){
        console.log("Intoxicación, riesgo de deshidratación");
        patient.score = score + 19; //menos puntaje que fiebre aproposito para que el que está febril pase primero y le bajen la fiebre
    }

    return patient;
}

module.exports = scorePatient;

