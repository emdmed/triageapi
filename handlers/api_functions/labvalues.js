let values =  {
    hemograma: {
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
            max: 500000
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
    },
    renal: {
        urea: {
            unit: "mg/dl",
            max: 50
        },
        creatinina: {
            unit: "mg/dl",
            max: 1.3
        }
    },
    ionograma: {
        na: {
            unit: false,
            min: 135,
            max: 145
        },
        k: {
            unit: false,
            min: 3.5,
            max: 5
        }
    }

}

module.exports = values;