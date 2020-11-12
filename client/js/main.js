triageAPI.initPatient()
triageAPI.setPatientAge(35)
triageAPI.updatePatientSymptoms("fever", true)
triageAPI.updatePatientSymptoms("cough", true)
triageAPI.updatePatientSymptoms("sorongo", true)
let done = triageAPI.scorePatient();
console.log(done);