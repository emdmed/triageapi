triageapi.render(".container", "patient")

console.log(patientModel)


$.ajax({
    url: "https://triageapi.herokuapp.com/api/patientModel",
    method: "GET",
    headers: {"Authorization": "linkedin"},
    success: function(res){
        console.log(res);
    }
})