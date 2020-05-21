const hospitalList = require("./hospitales.json");

const geo = {
    locateNearestHospital
}

//geo.locateNearestHospital({lat: -34.604163, lng: -58.425851});

function calcCrow(coords1, coords2)
{
  // var R = 6.371; // km
  var R = 6371000;
  var dLat = toRad(coords2.lat-coords1.lat);
  var dLon = toRad(coords2.lng-coords1.lng);
  var lat1 = toRad(coords1.lat);
  var lat2 = toRad(coords2.lat);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

function locateNearestHospital(patientGeoloc){
    let distances = [];
    hospitalList.forEach(element=>{
        let distance = calcCrow({lat: element.lat, lng: element.lng}, patientGeoloc)
        distances.push({hospital: element.hospital, distance: distance});
    })

    ////find smallest number
    let sorted = distances.sort(function(a, b) {
        return a.distance - b.distance;
    });

    return sorted[0]
}


module.exports = geo;