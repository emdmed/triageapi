var geolocation
var payload
let storedEbadge = JSON.parse(localStorage.getItem("EBADGE"))
let done = getParams()
let everythingok = false

console.log("PARAMS ", done)

if(done.id === "undefined" && done.insurance === "undefined"){

    if(storedEbadge){
        console.log("universal EBADGE")
        done.id = storedEbadge.id
        done.insurance = storedEbadge.insurance
        everythingok = true
    } else {
        alert("ERROR, something went wrong. No stored Ebadge credentials and no URL params")
    }

} else {
    console.log("Personal Ebadge")
    everythingok = true
}

getLocation()

function getParams() {

    var params = {},
        pairs = document.URL.split('?')
               .pop()
               .split('&');

    for (var i = 0, p; i < pairs.length; i++) {
           p = pairs[i].split('=');
           params[ p[0] ] =  p[1];
    }     

    return params;
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("geolocated")
  } else {
  "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  geolocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
  }
}



$("#patient").text(done.id)
$("#insurance").text(done.insurance)

$("body").on("click", ".emerbutton", async function(){

    if(everythingok === true){
        let text = $(this).text();


        payload = {
            patientid: done.id,
            insurance: done.insurance,
            emergency: text,
            geolocation: geolocation
        }
    
        console.log(payload)
    
        $("#numbermodal").modal("show")
    } else {
        alert("CRITICAL ERROR")
    }

})

$("body").on("click", "#send", function(){
    if(everythingok === true){
        payload.phone = $("#phone").val().trim()

        console.log("send payload", payload)
        $("#numbermodal").modal("hide")
        //render wait and be contacted
        $("#maindiv").empty();
        $("#maindiv").append(`
        
            <div class="card bg-danger text-white w-100">
            
                <div class="card-body bg-danger text-white w-100 text-center">
                
                    <h2 class="text-white">Help is on the way</h2>
                    <h5 class="text-white">You will be contacted at</h5>
                    <h5 class="text-white">${payload.phone}</h5>
                
                </div>
            
            </div>
        
        `);
    } else {
        alert("CRITICAL ERROR")
    }

})