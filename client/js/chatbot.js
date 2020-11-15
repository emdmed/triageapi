var CHATGLOBALSTATE = 0;
triageAPI.initPatient();
var ruleOutArray = [
  "1 - I have been hospitalized in an intensive care unit in the last 2 months",
  "2 - I have been diagnosed with cancer",
  "3 - I have been diagnosed an immune defficiency",
  "4 - I have had chemotherapy in the last 2 months",
  "5 - I have shortness of breath right now",
  "6 - It is difficult for me to speak and/or I have a limb or face paralysis",
  "7 - I have chest pain",
  "8 - I have been vomiting blood",
  "if none of these statements are true, please write continue"
];
var symptomsArray = [
  "1 - Fever",
  "2 - Cough",
  "3 - Abdominal pain",
  "4 - Throat pain",
  "5 - Urinating pain",
  "6 - Diarrhea",
  "7 - Vomiting",
];

var abdominalZones = [
  "1 - Upper right",
  "2 - Upper center",
  "3 - Upper left",
  "4 - Middle right",
  "5 - Middle center",
  "6 - Middle left",
  "7 - Bottom right",
  "8 - Bottom center",
  "9 - Bottom left",
];

function createChatbotChatbubble(text) {
  setTimeout(() => {
    $("#chat-area").append(`
        <div class="chatbubble chatbot">
            <p class="mb-0">${text}</p>
        </div>
    `);

    //scroll to bottom of chat
    var objDiv = document.getElementById("main-card");
    objDiv.scrollTop = objDiv.scrollHeight;

  }, 500);


}

function createUserChatbubble(text) {
  $("#chat-area").append(`
    <div class="chatbubble user">
        <p class="mb-0">${text}</p>
    </div>
  `);


  var objDiv = document.getElementById("main-card");
  objDiv.scrollTop = objDiv.scrollHeight;
}

setTimeout(() => {
  createChatbotChatbubble(
    "Hello I am Triage. Could you tell me your age please?"
  );
}, 100);

$("body").on("click", "#sendchat", function () {
  let text = $(".user-textarea").val();
  createUserChatbubble(text);
  processResponse(text);
  $(".user-textarea").val("");
  score();
});

function processResponse(text) {
  if (CHATGLOBALSTATE === 0) {
    //response must be age
    if (hasNumber(text) === true) {
      console.log("CHATGLOBALSTATE", CHATGLOBALSTATE);
      //go to ruleout
      triageAPI.setPatientAge(text)
      createChatbotChatbubble("Great");
      createChatbotChatbubble(
        "If one of the following statements are true, please answer with the corresponding number"
      );

      (function myLoop(i) {
        setTimeout(function () {
          createChatbotChatbubble(ruleOutArray[i]);
          ++i;
          if (i < ruleOutArray.length) myLoop(i);
        }, 2500);
      })(0);

      CHATGLOBALSTATE = 1;
      console.log("changed CHATGLOBALSTATE to:", CHATGLOBALSTATE);
    } else {
      chatbotDoesNotUnderstand();
    }
  } else if (CHATGLOBALSTATE === 1) {
    CHATGLOBALSTATE = 2
    //resolve ruleout
    if (hasNumber(text) === true) {
      //end chatbot loop, patient ruled out
      createChatbotChatbubble(
        "Please contact your personal medical doctor or go to the hospital ER"
      );
    } else if (text === "continue" || text === "Continue") {
      createChatbotChatbubble(
        "Alright, please select your symptoms from the following list. Please type the corresponding numbers separated by a space"
      );

      (function myLoop(i) {
        setTimeout(function () {
          createChatbotChatbubble(symptomsArray[i]);
          ++i;
          if (i < symptomsArray.length) myLoop(i);
        }, 2500);
      })(0);
      

    } else {
      chatbotDoesNotUnderstand();
    }
  } else if (CHATGLOBALSTATE === 2) {
    processSymptoms(text)
 
  } else if (CHATGLOBALSTATE === 3){
    //abdominal pain details
    if(hasNumber(text) === true){
      CHATGLOBALSTATE = 4
      processSymptoms(text)
 
    } else {
      chatbotDoesNotUnderstand();
    }

  } else if (CHATGLOBALSTATE === 4){
    createChatbotChatbubble("Scoring...")

  } 
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function chatbotDoesNotUnderstand() {
  let res = [
    "Sorry I did not catch that",
    "Sorry, I got distracted. Could you repeat that?",
  ];

  let random = Math.floor(Math.random() * res.length);
  console.log("random", random);

  $("#chat-area").append(`
    <div class="chatbubble chatbot">
        <p class="mb-0">${res[random]}</p>
    </div>
`);
}

function processSymptoms(text) {
  if (hasNumber(text) === true) {
    let receivedSymptomArray = text.split(" ");

    receivedSymptomArray.forEach((element) => {
      if (element === "1") {
        console.log("Fever");
        CHATGLOBALSTATE = 5
        triageAPI.updatePatientSymptoms("fever", true);
      }

      if (element === "2") {
        console.log("Cough");
        CHATGLOBALSTATE = 5
        triageAPI.updatePatientSymptoms("cough", true);
      }

      if (element === "3") {
        CHATGLOBALSTATE = 3
        //abdominal pain, ask where
        console.log("Abdominal pain");
        updatePatientSymptoms("abdominalPain", true);
        createChatbotChatbubble(
          "In what part of the abdomen does it hurt the most?"
        );

        (function myLoop(i) {
          setTimeout(function () {
            createChatbotChatbubble(abdominalZones[i]);
            ++i;
            if (i < abdominalZones.length) myLoop(i);
          }, 2500);
        })(0);
      }

      if (element === "4") {
        console.log("Throat pain");
        updatePatientSymptoms("throatPain", true);
        CHATGLOBALSTATE = 5
      }

      if (element === "5") {
        console.log("Urinating pain");
        updatePatientSymptoms("urinatingPain", true);
        CHATGLOBALSTATE = 5
      }

      if (element === "6") {
        console.log("Diarrhea");
        updatePatientSymptoms("Diarrhea", true);
        CHATGLOBALSTATE = 5
      }

      if (element === "7") {
        console.log("Vomiting");
        updatePatientSymptoms("vomiting", true);
        CHATGLOBALSTATE = 5
      }

      if(CHATGLOBALSTATE === 4){
        receivedSymptomArray.forEach(element => {
          if(element === "1"){
            triageAPI.setAbdominalPainLocation("rightHypochondium", true)
          }

          if(element === "2"){
            triageAPI.setAbdominalPainLocation("epigastricRegion", true)
          }

          if(element === "3"){
            triageAPI.setAbdominalPainLocation("leftHypochondium", true)
          }

          if(element === "4"){
            triageAPI.setAbdominalPainLocation("rightLumbar", true)
          }

          if(element === "5"){
            triageAPI.setAbdominalPainLocation("umbilicalRegion", true)
          }

          if(element === "6"){
            triageAPI.setAbdominalPainLocation("leftLumbar", true)
          }

          if(element === "7"){
            triageAPI.setAbdominalPainLocation("rightIliacRegion", true)
          }

          if(element === "8"){
            triageAPI.setAbdominalPainLocation("hypogastrium", true)
          }

          if(element === "9"){
            triageAPI.setAbdominalPainLocation("leftIliacRegion", true)
          }

          CHATGLOBALSTATE === 5
        
        })
      }
    });
  } else {
    chatbotDoesNotUnderstand();
  }
}

function score(){
  if(CHATGLOBALSTATE === 5){
    let score = triageAPI.scorePatient();
    createChatbotChatbubble(JSON.stringify(score))
  }
}