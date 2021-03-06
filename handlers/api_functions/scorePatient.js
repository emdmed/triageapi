let geo = require("./findGeolocation");
let labprocess = require("./labprocess");

let score = {
    scorePatient,
    ruleOut,
    checkAgePriority,
    diagnose
}

function scorePatient(patient){

    //check for geolocation
    if(patient.info.geolocation){
        if (patient.info.geolocation.lat === false && patient.info.geolocation.lng === false) {

        } else {
            let hospital = geo.locateNearestHospital(patient.info.geolocation);
            patient.nearestHospital = hospital.hospital;
        }
    }
    
    //check for lab
    let processedLab;
    if(patient.lab.isPresent === true){
        processedLab = labprocess.processh(patient.lab.values);
        
    } else {
        processedLab = false
    }

    //rule out
    let isRuledOut = ruleOut(patient)

    if(isRuledOut.score === 100){
        return isRuledOut
    } 

    //check age priority
    let checkedAgePriority = checkAgePriority(isRuledOut)

    let diagnosed = diagnose(checkedAgePriority);

    //append processedLab
    if(processedLab !== false){
        diagnosed.lab = processedLab;
    } else {
        diagnosed.lab = false;
    }

    return diagnosed;
}

function diagnose(patient) {
    console.log("diagnosing...");
    let score = patient.score;

    //Abdominal 

    //Acute abdomen (this must be before all other abdominal cases)
    if (patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.fever.isPresent === true) {
        console.log("Acute abdomen");
        patient.score = 70;
    }

    //Appendicitis
    if (patient.symptoms.fever.isPresent === true && patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.seven == true) {
        console.log("Apendicitis");
        patient.score = 85;
    }

    //Cholecystitis
    if (patient.symptoms.fever.isPresent === true && patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.one == true) {
        console.log("Cholecystitis");
        let score = patient.score;
        patient.score = score + 10;

    } else if (patient.symptoms.abdominalPain.isPresent === true && patient.symptoms.abdominalPain.location.one == true) {
        console.log("Cholecystitis, without fever");
        let score = patient.score;
        patient.score = score + 7;
    }

    //Respiratory tract infections
    //Pharyngitis-laryngitis
    if (patient.symptoms.throatPain.isPresent === true) {
        if (patient.symptoms.fever.isPresent === true) {
            patient.score = score + 2
            patient.info.covidAlert = true;
            console.log("Fever + ")
        } else if (patient.symptoms.fever.isPresent === false) {
            patient.score = score + 1
        }

        if (patient.symptoms.throatPain.voiceChange === false) {
            console.log("Pharyngitis");
        } else if (patient.symptoms.throatPain.voiceChange === true) {
            console.log("Laryngitis");
        }
    }

    //Upper respiratory tract infection
    if (patient.symptoms.throatPain.isPresent === true && patient.symptoms.fever.isPresent === true) {
        patient.score = score + 3
        patient.info.covidAlert = true
    }

    //Lower respiratory tract infection
    if (patient.symptoms.fever.isPresent === true && patient.symptoms.cough.isPresent === true) {
        console.log("respiratory infection")
        patient.score = score + 15;
        patient.info.covidAlert = true
    }

    //Urinary tract infection
    if (patient.symptoms.urinatingPain.isPresent == true && patient.symptoms.fever.isPresent === false) {
        console.log("Lower urinary tract infection")
        patient.score = score + 3;
    } else if (patient.symptoms.urinatingPain.isPresent == true && patient.symptoms.fever.isPresent === true) {
        console.log("Upper or complicated urinary tract infection");
        patient.score = score + 10;
    }

    //Urgent generalities (not top urgency but need to be prioritized before anything else)
    //DVT
    if (patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.rightLeg === true || patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.leftLeg === true) {
        console.log("DVT");
        patient.score = 85;
    }

    //Heart failure
    if (patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.rightLeg === true && patient.symptoms.edema.location.leftLeg === true && patient.symptoms.cough.isPresent === true) {
        console.log("Heart failure");
        patient.score = score + 20;
    }

    //Alergy
    if (patient.symptoms.cough.isPresent === true && patient.symptoms.edema.isPresent === true && patient.symptoms.edema.location.face) {
        console.log("Alergies");
        patient.score = 75;
    }

    //Variable priority generalities
    //Gastroenteritis
    if (patient.symptoms.fever.isPresent === true && patient.symptoms.diarrhea.isPresent === true) {
        console.log("Enteritis/gastroenteritis")
        patient.score = score + 15;
    } else if (patient.symptoms.fever.isPresent === true && patient.symptoms.diarrhea.isPresent === true && patient.symptoms.vomiting.isPresent === true) {
        console.log("Gastroenteritis, dehydration risk");
        patient.score = score + 20;
    } else if (patient.symptoms.diarrhea.isPresent === true && patient.symptoms.vomiting.isPresent === true) {
        console.log("Intoxication, dehydration risk");
        patient.score = score + 19; //menos puntaje que fiebre aproposito para que el que está febril pase primero y le bajen la fiebre
    }

    //Headache
    if (patient.symptoms.headache.isPresent === true){
        //Tensional headache
        if (patient.symptoms.headache.characteristics.intensity === 10 || patient.symptoms.headache.characteristics.intensity === 9){
            patient.score = 90
        } else if (patient.symptoms.headache.characteristics.intensity < 9 && patient.symptoms.headache.characteristics.intensity > 5){
            patient.score + 15
        } else {
            patient.score + 5
        }
    }

    return patient;
}

function ruleOut(patient){

    for (key in patient.ruleOut) {
        if (patient.ruleOut[key] === true || patient.ruleOut[key] === "true") {
            console.log("patient ruled out! because: ", key, " is true");
            patient.score = 100;
        }
    }

    return patient
}

function checkAgePriority(patient){
    if (patient.info.age >= 40 && patient.info.age < 70) {
        patient.score = 30;
    } else if (patient.info.age >= 18 && patient.info.age < 40) {
        patient.score = 0;
    } else if (patient.info.age > 70) {
        patient.score = 60;
    }

    return patient
}

module.exports = score;

