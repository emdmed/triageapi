console.log("TRIAGEJS LOADED")

let triageapi = {
    render,
    getPatientModel
}

//append a card to an element
function render(DOMelement, type){

    console.log("run")

    let elementToAppend;
    if(type === "patient"){
        elementToAppend = `
        
        <div class="card">
        
            <div class="card-body">

                <h1>Patient</h1>

            </div>

        </div>
        
        `
    }
    console.log(DOMelement, type);
    $(DOMelement).append(elementToAppend);
}

async function getPatientModel(){
    let newdata = await $.ajax({
        url: "http://triageapi.herokuapp.com/api/patientModel",
        method: "GET",
        headers: {"Authorization": "linkedin"},
        dataType: "application/json",
        success: function(res){
            let data = res;
            return data;
        }
    })

    return newdata;
}


function renderSymptoms(patient, DOMelement){
    symptoms = patient.symptoms;

    for(key1 in symptoms){
     
        $(DOMelement).append(`
            <button class="btn btn-outline-primary" id="${key1}">${symptoms[key]}</button>    
            <hr>
        `)
    }
}