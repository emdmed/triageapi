var SCORED;

let patientObject = {
  info: {
    gender: false,
    age: false,
    phone: false,
    date: false,
    number: false,
    nomobile: false,
    covidAlert: false,
    geolocation: {
      lat: false,
      lng: false
    }
  },
  ruleOut: {
    intensiveCareInLastMonth: false,
    cancer: false,
    immuneDefficiency: false,
    chemoInLast2Months: false,
    dyspnea: false,
    acuteMotorImpairment: false,
    chestPain: false,
    hematemesis: false
  },
  symptoms: {
    fever: {
      isPresent: false,
      measured: false,
      durationInDays: null,
      abortedWithAntipyretics: false
    },
    cough: {
      isPresent: false,
      sputum: {
        isPresent: false,
        color: {
          isGreen: false,
          isYellow: false,
          isTransparent: false,
          isWhite: false,
          isRed: false
        }
      }
    },
    abdominalPain: {
      isPresent: false,
      durationInDays: null,
      location: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false
      }
    },
    throatPain: {
      isPresent: false,
      voiceChange: false,
      durationInDays: null
    },
    runnyNose: {
      isPresent: false,
      sputum: {
        color: {
          isGreen: false,
          isYellow: false,
          isTransparent: false,
          isWhite: false,
          isRed: false
        }
      }
    },
    urinatingPain: {
      isPresent: false,
      durationInDays: null,
      secretions: {
        isPresent: false,
        color: {
          isGreen: false,
          isYellow: false,
          isTransparent: false,
          isWhite: false,
          isRed: false
        }
      }
    },
    diarrhea: {
      isPresent: false,
      color: {
        isRed: false,
        isBlack: false
      }
    },
    vomiting: {
      isPresent: false
    },
    pain: {
      isPresent: false,
      location: {
        rightLeg: false,
        leftLeg: false,
        rightArm: false,
        leftArm: false,
        head: false,
        neck: false,
        lumbar: false
      }
    },
    edema: {
      isPresent: false,
      location: {
        rightLeg: false,
        leftLeg: false,
        face: false
      }
    }
  },
  lab: {
    isPresent: false,
    values: {
      hemograma: {
        hto: false,
        hb: false,
        gb: {
          count: false,
          neu: false,
          lin: false,
          mon: false,
          eos: false,
          bas: false
        },
        plqt: false,
        ferritina: false,
        transferrina: false,
        satTransferrina: false,
        TIBC: false,
        ferremia: false,
        vcm: false,
        rdw: false,
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
  }
}

const triageAPI = {
  initPatient,
  updatePatientSymptoms,
  scorePatient,
  setPatientAge,
  setAbdominalPainLocation,
  setRuleOut,
  patientObject
}

function initPatient() {
  localStorage.setItem("patientObject", JSON.stringify(patientObject))
}

function updatePatientSymptoms(objectkey, value) {
  //check if there is a patientObject in localstorage
  let patientObjectExists = JSON.parse(localStorage.getItem("patientObject"));
  if (!patientObjectExists) {
    console.log("ALERT: call initPatientSymptoms() before trying to update the stored patient object");
  } else {
    if (patientObjectExists.symptoms[objectkey]) {
      patientObjectExists.symptoms[objectkey].isPresent = value
      localStorage.setItem("patientObject", JSON.stringify(patientObjectExists))
      console.log("Patient object updated: <<" + objectkey + " = " + value + ">>");
    } else {
      console.log("Error: no such key exists in patient object -> " + objectkey)
    }
  }
}

function scorePatient() {
  let patientObjectExists = JSON.parse(localStorage.getItem("patientObject"));
  if (!patientObjectExists) {
    console.log("Error: there is no patient object to send in localstorage, call first initPatient()");
  } else {
    let done = $.ajax({
      url: "http://triageapi.herokuapp.com/api/score",
      method: "POST",
      headers: { "Authorization": "linkedin" },
      async: false,
      contentType: "application/json",
      data: localStorage.getItem("patientObject"),
      success: function (res) {
        let data = res;
        return data
      }
    })
    return done.responseJSON
  }
}

function setPatientAge(age) {
  let patientObjectExists = JSON.parse(localStorage.getItem("patientObject"));
  if (!patientObjectExists) {
    console.log("ALERT: call initPatientSymptoms() before trying to update the stored patient object");
  } else {
    patientObjectExists.info.age = age
    localStorage.setItem("patientObject", JSON.stringify(patientObjectExists))
    console.log("<<Updated age>>");

  }
}

function setAbdominalPainLocation(location, value) {
  let patientObjectExists = JSON.parse(localStorage.getItem("patientObject"));
  if (!patientObjectExists) {
    console.log("ALERT: call initPatientSymptoms() before trying to update the stored patient object");
  } else {
    if (location === "rightHypochondium") {
      patientObjectExists.symptoms.abdominalPain.location.one = value;
    } else if (location === "epigastricRegion") {
      patientObjectExists.symptoms.abdominalPain.location.two = value;
    } else if (location === "leftHypochondrium") {
      patientObjectExists.symptoms.abdominalPain.location.three = value;
    } else if (location === "rightLumbar") {
      patientObjectExists.symptoms.abdominalPain.location.four = value;
    } else if (location === "umbilicalRegion") {
      patientObjectExists.symptoms.abdominalPain.location.five = value;
    } else if (location === "leftLumbar") {
      patientObjectExists.symptoms.abdominalPain.location.six = value;
    } else if (location === "rightIliacRegion") {
      patientObjectExists.symptoms.abdominalPain.location.seven = value;
    } else if (location === "hypogastrium") {
      patientObjectExists.symptoms.abdominalPain.location.eight = value;
    } else if (location === "leftIliacRegion") {
      patientObjectExists.symptoms.abdominalPain.location.nine = value;
    }
  }
}

function setRuleOut(key, value) {
  let patientObjectExists = JSON.parse(localStorage.getItem("patientObject"));
  if (!patientObjectExists) {
    console.log("ALERT: call initPatientSymptoms() before trying to update the stored patient object");
  } else {
    console.log(patientObjectExists.ruleOut[key])
    if(patientObjectExists.ruleOut[key] === false || patientObjectExists.ruleOut[key] === true){
      patientObjectExists.ruleOut[key] = value
      localStorage.setItem("patientObject", JSON.stringify(patientObjectExists))
      console.log("Patient object updated: <<" + key + " = " + value + ">>");
    } else {
      console.log("Error: no such key exists in patient object -> " + key)
    } 
  }
}
