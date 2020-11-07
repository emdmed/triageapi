# triageapi
A triage API that receives symptoms and returns an urgency score. It also returns the nearest hospital (only in Buenos Aires)

Access website at https://triageapi.herokuapp.com

- Laboratory interpretation model now merged with patient model.
Now basic laboratory results can be interpreted by the API.

Example:
```javascript
    {
        "score": 30,
        "age": 50,
        "covidAlert": false,
        "date": 1604461368362,
        "patientID": "47fca1fa9445c4f84390",
        "lab": {
            "anemia": {
                "title": "Microcytic anemia",
                "suggestion": "Request iron parameters"
            },
            "thrombocytopenia": {
                "title": "Very low platelets",
                "suggestion": "Consult at the emergency ward"
            },
            "hyponatremia": {
                "title": "Low sodium",
                "suggestion": "Consult at the emergency ward"
            }
        }
    }
```
--------------------------------------------------------------------------
# How to use it

1) Request patient object with the following route -> https://triageapi.herokuapp.com/api/patientModel

2) Modify the patient object data as you see fit (age, symtpoms, geolocation, etc)

3) Send the modified object back to the API for scoring at -> https://triageapi.herokuapp.com/api/score

4) Scoring response example:

```javascript
    {
        "score": 85
        "age": 52
        "covidAlert": false
        "date": 1589811614301
        "patientID": null
        "lab": (if lab parameters are sent, the system will try to respond with an interpretation)
    }
```

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

# TODO short term

- labProcess diagnostics testing
- debug hipokalemia diagnostic

# TODO long term

- add more diagnostic options