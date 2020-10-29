var Patient = {
    info: {
        gender: false,
        age: false,
        phone: false,
        date: false,
        number: null,
        nomobile: false,
        covidAlert: false,
        geolocation: {
            lat: false,
            lng: false
        }
    },
    ruleOut: {
        intensiveCareInLastMonth: true,
        cancer: true,
        immuneDefficiency: true,
        chemoInLast2Months: true,
        dyspnea: true,
        acuteMotorImpairment: true,
        chestPain: true,
        hematemesis: true
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
                },

            }
        },
        abdominalPain: {
            isPresent: false,
            durationInDays: null,
            location: { //up to down right to left
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
        }
    }
}

module.exports = Patient;