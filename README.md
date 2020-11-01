# triageapi
A triage API that receives symptoms and returns an urgency score. It also returns the nearest hospital (only in Buenos Aires)

Access readme at https://triageapi.herokuapp.com

when cloning check that "prod" variable in config.js is set to false

TODO

[] - add more diagnostic options /br
[] - debug laboratory interpretation /br

--------------------------------------------------------------------------
# How to use it

1) Request patient object with the following route -> https://triageapi.herokuapp.com/api/patientModel

2) Modify the patient object data as you see fit (age, symtpoms, geolocation, etc)

3) send the modified obect back to the API for scoring at -> https://triageapi.herokuapp.com/api/score

4) Scoring response example:

    {
        "score": 85
        "age": 52
        "covidAlert": false
        "date": 1589811614301
        "patientID": null
    }

--------------------------------------------------------------------------

Pathologies taken in account for priorization:

- Acute abdomen (medical, quirurgic)
- Appendicitis
- Cholecystitis
- Pharyngitis
- Laryngitis
- Acute upper respiratory infection
- Lower urinary tract infection
- Upper/ lower complicated urinary tract infection 
- Deep venous thrombosis (incomplete)
- Cardiac failure (incomplete)
- Alergy (incomplete)
- Gastroenteritis