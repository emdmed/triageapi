triageAPI.initPatient();
triageAPI.setUniquePatientID("hola", "sha256");
triageAPI.setPatientAge(45);
triageAPI.updatePatientSymptoms("fever", true);
let scored = triageAPI.scorePatient();
console.log(scored);
