let patientModel = {
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
    }
}

let latitude = false
let longitude = false;

$("body").on("click", "#patient1", function(){

    let age =  $("#age").val();

    let newPatient = patientModel;

    newPatient.info.age = age;
    newPatient.ruleOut.chestPain = true;
    newPatient.info.geolocation.lat = latitude;
    newPatient.info.geolocation.lng = longitude;

    console.log(newPatient);

    $.ajax({
        url: "https://triageapi.herokuapp.com/api/score",
        headers: {"Authorization" : "linkedin"},
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newPatient),
        success: function(res){

            console.log(res);

            let patient = res;
            let priority;
            let geolocation = ""

            if(patient.score > 30 && patient.score < 70){
                priority = "bg-warning text-dark"
            } else if (patient.score > 70){
                priority = "bg-danger text-white"
            } else {
                priority = "bg-success text-white"
            }
            if(!patient.nearestHospital){

            } else {
                geolocation = `<p>Hospital mas cercano <span class="h5">${patient.nearestHospital}</span></p>`
            }

            $("#triagedPetientHere").append(`
            
            <div class="card ${priority}">
                <div class="card-body">
                    <h5>Paciente <span class="font-italic font-weight-regular">${patient.age} años</span></h5>
                    <h5>Score: ${patient.score}</h5>
                    ${geolocation}
                </div>
            </div>
            
            `)
        }
    })
})

$("body").on("click", "#patient2", function(){

    let age =  $("#age").val();

    let newPatient = patientModel;

    newPatient.info.age = age;
    newPatient.symptoms.fever.isPresent = true;
    newPatient.symptoms.abdominalPain.isPresent = true;
    newPatient.symptoms.abdominalPain.location.seven = true;
    newPatient.info.geolocation.lat = latitude;
    newPatient.info.geolocation.lng = longitude;

    console.log(newPatient);

    $.ajax({
        url: "https://triageapi.herokuapp.com/api/score",
        headers: {"Authorization" : "linkedin"},
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newPatient),
        success: function(res){

            console.log(res);

            let patient = res;
            let priority;
            let geolocation = ""

            if(patient.score > 30 && patient.score < 70){
                priority = "bg-warning text-dark"
            } else if (patient.score >= 70){
                priority = "bg-danger text-white"
            } else {
                priority = "bg-success text-white"
            }
            if(!patient.nearestHospital){

            } else {
                geolocation = `<p>Hospital mas cercano <span class="h5">${patient.nearestHospital}</span></p>`
            }

            $("#triagedPetientHere").append(`
            
            <div class="card ${priority}">
                <div class="card-body">
                    <h5>Paciente <span class="font-italic font-weight-regular">${patient.age} años</span></h5>
                    <h5>Score: ${patient.score}</h5>
                    ${geolocation}
                </div>
            </div>
            
            `)
        }
    })
})

$("body").on("click", "#patient3", function(){

    let age =  $("#age").val();

    let newPatient = patientModel;

    newPatient.info.age = age;
    newPatient.symptoms.cough.isPresent = true;
    newPatient.info.geolocation.lat = latitude;
    newPatient.info.geolocation.lng = longitude;

    console.log(newPatient);

    $.ajax({
        url: "https://triageapi.herokuapp.com/api/score",
        headers: {"Authorization" : "linkedin"},
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newPatient),
        success: function(res){

            console.log(res);

            let patient = res;
            let priority;
            let geolocation = ""

            if(patient.score > 30 && patient.score < 70){
                priority = "bg-warning text-dark"
            } else if (patient.score >= 70){
                priority = "bg-danger text-white"
            } else {
                priority = "bg-success text-white"
            }
            if(!patient.nearestHospital){

            } else {
                geolocation = `<p>Hospital mas cercano <span class="h5">${patient.nearestHospital}</span></p>`
            }

            $("#triagedPetientHere").append(`
            
            <div class="card ${priority}">
                <div class="card-body">
                    <h5>Paciente <span class="font-italic font-weight-regular">${patient.age} años</span></h5>
                    <h5>Score: ${patient.score}</h5>
                    ${geolocation}
                </div>
            </div>
            
            `)
        }
    })
})


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude =  position.coords.latitude;
  longitude = position.coords.longitude;
  $("#geolocation").text("Geolocalizado!");
}
