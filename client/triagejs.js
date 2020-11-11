console.log("triage.js loaded...")

const triageAPI = {
    getPatientModel
}

function getPatientModel(){
    let newdata = (async function(){
        let data = await $.ajax({
            url: "http://triageapi.herokuapp.com/api/patientModel",
            method: "GET",
            headers: {"Authorization": "linkedin"},
            success: function(res){
                let data = res;
                console.log(data, "data")
                return data;
            }
        })
        return data
    })();
    return newdata
}
