# triageapi
A triage API that receives symptoms and returns an urgency score. It also returns the nearest hospital (only in Buenos Aires)

Access readme at https://triageapi.herokuapp.com

when cloning check that "prod" variable in config.js is set to false

TODO

[] - add more diagnostic options
[] - debug laboratory interpretation

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