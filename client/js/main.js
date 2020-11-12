triageAPI.initPatient()
triageAPI.setPatientAge(35)
triageAPI.updatePatientSymptoms("fever", true)
triageAPI.updatePatientSymptoms("cough", true)
triageAPI.updatePatientSymptoms("sorongo", true)
let scored = triageAPI.scorePatient();
console.log(scored);