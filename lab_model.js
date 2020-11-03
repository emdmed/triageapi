const labModel = {
    hemograma : {
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

module.exports = labModel;