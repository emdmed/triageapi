# triageapi
A triage API that receives symptoms and returns an urgency score. It also returns the nearest hospital (only in Buenos Aires)

Access readme at https://triageapi.herokuapp.com

(When cloning check that "prod" variable in config.js is set to false)

# TODO

- add more diagnostic options
- debug laboratory interpretation

--------------------------------------------------------------------------
# How to use it

1) Request patient object with the following route -> https://triageapi.herokuapp.com/api/patientModel

2) Modify the patient object data as you see fit (age, symtpoms, geolocation, etc)

3) Send the modified obect back to the API for scoring at -> https://triageapi.herokuapp.com/api/score

4) Scoring response example:

<pre>
    { <br/>
        "score": 85 <br/>
        "age": 52 <br/>
        "covidAlert": false <br/>
        "date": 1589811614301 <br/>
        "patientID": null <br/>
    } <br/>
</pre>

--------------------------------------------------------------------------

# Pathologies taken in account for priorization:

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
