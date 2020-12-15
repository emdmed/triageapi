var geolocation
var payload

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

let done = getParams()

$("#patient").text(done.id)
$("#insurance").text(done.insurance)

$("body").on("click", ".emerbutton", async function(){
    let text = $(this).text();


    payload = {
        patientid: done.id,
        insurance: done.insurance,
        emergency: text,
        geolocation: geolocation
    }

    console.log(payload)

    $("#numbermodal").modal("show")
})

$("body").on("click", "#send", function(){
    payload.phone = $("#phone").val().trim()

    console.log("send payload", payload)
})