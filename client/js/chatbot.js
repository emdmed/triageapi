const { create } = require("domain");

var CHATGLOBALSTATE = 0;
var ruleOutArray = [
  "1 - I have been hospitalized in an intensive care unit in the last 2 months",
  "2 - I have been diagnosed with cancer",
  "3 - I have been diagnosed an immune defficiency",
  "4 - I have had chemotherapy in the last 2 months",
  "5 - I have shortness of breath right now",
  "6 - It is difficult for me to speak and/or I have a limb or face paralysis",
  "7 - I have chest pain",
  "8 - I have been vomiting blood",
  "if none of these statements are true, please write continue",
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
  }, 2000);
}

function createUserChatbubble(text) {
  $("#chat-area").append(`
          <div class="chatbubble user">
              <p class="mb-0">${text}</p>
          </div>
      `);
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
});

function processResponse(text) {
  if (CHATGLOBALSTATE === 0) {
    //response must be age
    if (hasNumber(text) === true) {
      console.log("CHATGLOBALSTATE", CHATGLOBALSTATE);
      //go to ruleout
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
    //resolve ruleout
    if (hasNumber(text) === true) {
      //end chatbot loop, patient ruled out
      createChatbotChatbubble(
        "Please contact your personal medical doctor or go to the hospital ER"
      );
    } else if (text === "continue" || text === "Continue") {
      CHATGLOBALSTATE = 2
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
  } else if (CHATGLOBALSTATE === 2){
    processSymptoms(text)
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
      }

      if (element === "2") {
        console.log("Cough");
      }

      if (element === "3") {
        //abdominal pain, ask where
        console.log("Abdominal pain");
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
      }

      if (element === "5") {
        console.log("Urinating pain");
      }

      if (element === "6") {
        console.log("Diarrhea");
      }

      if (element === "7") {
        console.log("Vomiting");
      }
    });
  } else {
    chatbotDoesNotUnderstand();
  }
}
