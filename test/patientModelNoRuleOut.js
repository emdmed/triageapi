var Patient = {
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

module.exports = Patient;