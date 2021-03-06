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

## Use this library to easily update the patient object in steps
*for chatbots or step by step forms*

<hr>

Installation in HTML file
```javascript
  <script src="http://triageapi.herokuapp.com/triagejs"></script>
```
<hr>

```javascript
    triageAPI.initPatient()
```
InitPatient() : creates the patient object in localstorage for easy modification through different pages. *Must* call it always before trying to update with the following methods. 

<hr>

```javascript
   triageAPI.setPatientAge(35)
```
setPatientAge() : updates the patient's age. *Must* call it before sending the patient to the API to avoid receiveing an error response. Patient without a set age can't be scored.

<hr>

```javascript
    triageAPI.updatePatientSymptoms("fever", true)
```
updatePatientSymptoms() : sets desired symptom to true

### Symptoms: 
- fever
- cough
- abdominalPain
- throatPain
- runnyNose
- urinatingPain
- diarrhea
- vomiting
- pain
- edema

<hr>

```javascript
    triageAPI.setAbdominalPainLocation("rightHypochondrium", true)
```
setAbdominalPainLocation() : sets desired abdominal zone to true or false for scoring

Zones: 
- rightHypochondium
- epigastricRegion
- leftHypochondium
- rightLumbar
- umbilicalRegion
- leftLumbar
- rightIliacRegion
- hypogastrium
- leftIliacRegion

<hr>

```javascript
    let scored = triageAPI.scorePatient();
    console.log(scored);
```
scorePatient() sends modified patient object to the API for scoring and returns a scored response <br>
*synchronous ajax call* 

Response: 
```javascript
    {
        "score": 30,
        "age": 50,
        "covidAlert": false,
        "date": 1604461368362,
        "patientID": "47fca1fa9445c4f84390"
    }
```

<hr>

### Scoring Example

```javascript
    triageAPI.initPatient();
    triageAPI.setUniquePatientID("thisisanuniqueid", "sha256");
    triageAPI.setPatientAge(45);
    triageAPI.updatePatientSymptoms("fever", true);
    triageAPI.updatePatientSymptoms("cough", true);
    let scored = triageAPI.scorePatient();
    console.log(scored);
```

<hr>

```javascript
    triageAPI.setRuleOut("intensiveCareInLastMonth", true)
```

setRuleOut() : sets ruleOut keys to true or false

### ruleOut keys
- intensiveCareInLastMonth
- cancer
- immuneDefficiency
- chemoInLast2Months
- dyspnea
- acuteMotorImpairment
- chestPain
- hematemesis

<hr>

## Unique ID generation
Consistent hashed ID for patient tracking <br>

Enabling uniqueID the scored response will return a hashed patientID, it will be always the same provided the same string parameter.
The hashing can be done with sha256 or base64.

### With triage.js library

```javascript
    triageAPI.setUniquePatientID("helloworld", "sha256")
```
### Without triage.js library

```javascript
    patientModel.info.hashString = "helloworld"
```
```javascript
    patientModel.config = {uniqueIdEncryption: "sha256"}
```
<hr>

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

- [ ] write unit test for headache
- [ ] expand triage.js library
- [ ] add ions to apitest frontend
- [ ] add more iron and anemia parameters to apitest frontend
- [x] write labProcess diagnostics tests
- [x] debug labprocess.js
- [x] Unique and consistent patientID

# TODO long term

- [ ] add more diagnostic options