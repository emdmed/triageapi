# triageapi
A triage API that receives symptoms and returns an urgency score. It also returns the nearest hospital (only in Buenos Aires)

Access website at https://triageapi.herokuapp.com

### Scoring response example:
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

0) Please use this header in all your requests to acces the API:

```javascript
    headers: {"Authorization": "linkedin"}
```

1) Request patient object with the following route -> https://triageapi.herokuapp.com/api/patientModel

2) Modify the patient object data as you see fit (age, symtpoms, geolocation, etc)

3) Send the modified object back to the API for scoring at -> https://triageapi.herokuapp.com/api/score

4) Scoring response example: <br>
    *date in unix timestamp*
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

6) To send lab parameters in the patient object:

```javascript
 "lab": {isPresent: true, values: "values here"}
 ```


--------------------------------------------------------------------------

# triage.js library

### Use this library to easily update the patient object in steps
*for chatbots or step by step forms*

```javascript
    triageAPI.initPatient()
```
InitPatient() : creates the patient object in localstorage for easy modification through different pages. *Must* call it always before trying to update with the following methods. 

```javascript
   triageAPI.setPatientAge(35)
```
setPatientAge() : updates the patient's age. *Must* call it before sending the patient to the API to avoid receiveing an error response. Patient without a set age cant be scored.


# Pathologies taken in account for priorization:

- Acute abdomen
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

- [x] write labProcess diagnostics tests
- [x] debug labprocess.js
- [ ] add ions to apitest frontend
- [ ] add more iron and anemia parameters to apitest frontend

# TODO long term

- [ ] add more diagnostic options