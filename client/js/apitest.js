function checkCheckboxes() {
    let intensiveCareInLastMonth;
    if ($("#intensiveCareInLastMonth").is(":checked") === true) {
        intensiveCareInLastMonth = true;
    } else {
        intensiveCareInLastMonth = false;
    }

    let cancer;
    if ($("#cancer").is(":checked") === true) {
        cancer = true;
    } else {
        cancer = false
    }

    let immuneDefficiency;
    if ($("#immuneDefficiency").is(":checked") === true) {
        immuneDefficiency = true;
    } else {
        immuneDefficiency = false
    }

    let chemoInLast2Months
    if ($("#chemoInLast2Months").is(":checked") === true) {
        chemoInLast2Months = true;
    } else {
        chemoInLast2Months = false;
    }

    let dyspnea
    if ($("#dyspnea").is(":checked") === true) {
        dyspnea = true;
    } else {
        dyspnea = false;
    }

    let acuteMotorImpairment
    if ($("#acuteMotorImpairment").is(":checked") === true) {
        acuteMotorImpairment = true;
    } else {
        acuteMotorImpairment = false;
    }

    let chestPain
    if ($("#chestPain").is(":checked") === true) {
        chestPain = true;
    } else {
        chestPain = false
    }

    let hematemesis
    if ($("#hematemesis").is(":checked") === true) {
        hematemesis = true;
    } else {
        hematemesis = false;
    }

    //symptoms

    let one
    if ($("#one").is(":checked") === true) {
        one = true;
    } else {
        one = false;
    }

    let two
    if ($("#two").is(":checked") === true) {
        two = true;
    } else {
        two = false;
    }

    let three
    if ($("#three").is(":checked") === true) {
        three = true;
    } else {
        three = false;
    }

    let four
    if ($("#four").is(":checked") === true) {
        four = true;
    } else {
        four = false;
    }

    let five
    if ($("#five").is(":checked") === true) {
        five = true;
    } else {
        five = false;
    }

    let six
    if ($("#six").is(":checked") === true) {
        six = true;
    } else {
        six = false;
    }

    let seven
    if ($("#seven").is(":checked") === true) {
        seven = true;
    } else {
        seven = false;
    }

    let eight
    if ($("#eight").is(":checked") === true) {
        eight = true;
    } else {
        eight = false;
    }

    let nine
    if ($("#nine").is(":checked") === true) {
        nine = true;
    } else {
        nine = false;
    }

    let throatPain
    if ($("#throatPain").is(":checked") === true) {
        throatPain = true;
    } else {
        throatPain = false;
    }

    let urinatingPain
    if ($("#urinatingPain").is(":checked") === true) {
        urinatingPain = true;
    } else {
        urinatingPain = false;
    }

    let diarrhea
    if ($("#diarrhea").is(":checked") === true) {
        diarrhea = true;
    } else {
        diarrhea = false;
    }

    let vomiting
    if ($("#vomiting").is(":checked") === true) {
        vomiting = true;
    } else {
        vomiting = false;
    }

    let fever
    if ($("#fever").is(":checked") === true) {
        fever = true;
    } else {
        fever = false;
    }

    let cough
    if ($("#cough").is(":checked") === true) {
        cough = true;
    } else {
        cough = false;
    }



    let newpatient = getPatient();

    //modify
    newpatient.ruleOut.intensiveCareInLastMonth = intensiveCareInLastMonth;
    newpatient.ruleOut.cancer = cancer;
    newpatient.ruleOut.immuneDefficiency = immuneDefficiency;
    newpatient.ruleOut.chemoInLast2Months = chemoInLast2Months;
    newpatient.ruleOut.dyspnea = dyspnea;
    newpatient.ruleOut.acuteMotorImpairment = acuteMotorImpairment;
    newpatient.ruleOut.chestPain = chestPain;
    newpatient.ruleOut.hematemesis = hematemesis

    newpatient.symptoms.abdominalPain.location.one = one;
    newpatient.symptoms.abdominalPain.location.two = two;
    newpatient.symptoms.abdominalPain.location.three = three;
    newpatient.symptoms.abdominalPain.location.four = four;
    newpatient.symptoms.abdominalPain.location.five = five;
    newpatient.symptoms.abdominalPain.location.six = six;
    newpatient.symptoms.abdominalPain.location.seven = seven;
    newpatient.symptoms.abdominalPain.location.eight = eight;
    newpatient.symptoms.abdominalPain.location.nine = nine;

    if (
        newpatient.symptoms.abdominalPain.location.one === true ||
        newpatient.symptoms.abdominalPain.location.two === true ||
        newpatient.symptoms.abdominalPain.location.three === true ||
        newpatient.symptoms.abdominalPain.location.four === true ||
        newpatient.symptoms.abdominalPain.location.five === true ||
        newpatient.symptoms.abdominalPain.location.six === true ||
        newpatient.symptoms.abdominalPain.location.seven === true ||
        newpatient.symptoms.abdominalPain.location.eight === true ||
        newpatient.symptoms.abdominalPain.location.nine === true
    ) {
        newpatient.symptoms.abdominalPain.isPresent = true
    }

    newpatient.symptoms.throatPain.isPresent = throatPain;
    newpatient.symptoms.urinatingPain.isPresent = urinatingPain;
    newpatient.symptoms.diarrhea.isPresent = diarrhea;
    newpatient.symptoms.vomiting.isPresent = vomiting;
    newpatient.symptoms.fever.isPresent = fever;
    newpatient.symptoms.cough.isPresent = cough;

    newpatient.info.age = $("#age").val();

    // LAB

    let hb = parseInt($("#hb").val());
    let mcv = parseInt($("#mcv").val());
    let ferritin = parseInt($("#ferritin").val());
    let wbc = parseInt($("#wbc").val());
    let neutrophils = parseInt($("#neutrophils").val());

    console.log(hb, mcv, ferritin, wbc, neutrophils)

    if (
        hb === NaN &&
        mcv === NaN &&
        ferritin === NaN &&
        wbc === NaN &&
        neutrophils === NaN
    ) {
        newpatient.lab.isPresent = false
    } else {
        newpatient.lab.isPresent = true
    }

    newpatient.lab.values.hemograma.hb = hb;
    newpatient.lab.values.hemograma.vcm = mcv;
    newpatient.lab.values.hemograma.ferritina = ferritin;
    newpatient.lab.values.hemograma.gb.count = wbc;
    newpatient.lab.values.hemograma.gb.neu = neutrophils;

    if(newpatient.lab.values.hemograma.gb.count === NaN ){
        newpatient.lab.values.hemograma.gb.count = false
    }

    if(newpatient.lab.values.hemograma.gb.neu === NaN){
        newpatient.lab.values.hemograma.gb.neu = false
    }

    return newpatient;

}

function getPatient() {
    let patient = {
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

    return patient
}

$("body").on("click", "#check", function () {

    //clear result div
    $("#result").empty();

    let patient = checkCheckboxes()

    console.log(patient)

    $.ajax({
        url: "https://triageapi.herokuapp.com/api/score",
        method: "POST",
        headers: { "Authorization": "linkedin" },
        contentType: "application/json",
        data: JSON.stringify(patient),
        success: function (res) {
            console.log(res);
            let data = res;
            renderResultCard("#result", data)
        }
    })
})

function renderResultCard(location, object) {
    let border;
    if (object.score >= 60) {
        border = "border-danger"
    } else if (object.score > 30 && object.score < 60) {
        border = "border-warning"
    } else if (object.score > 0 && object.score <= 30) {
        border = "border-success"
    }
    $(location).append(`
    
        <div class="card bg-light ${border} mb-3">
        
            <div class="card-body">
            
                <h4>Score: ${object.score}</h4>
                <h4>Covid Alert: ${object.covidAlert}</h4>
                <hr>
                <h5>Laboratory</h5>
                <div id="labHere"></div>

            </div>
        
        </div>
    
    `)

    console.log("LAB ", object.lab)

    if(object.lab){
        for(key in object.lab){
            console.log(object.lab[key])
            $("#labHere").append(`
            
                <p>${object.lab[key].title}</p>

            `)
        }
    } 
}