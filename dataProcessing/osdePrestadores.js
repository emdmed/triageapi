const osde; //require json file here

function createHospitalList(){
    let hospitalList = [];
    osde.ListaPrestador.forEach(element=>{
        console.log(element.nombre);
        let hospitalUnit = {
            hospital: element.nombre.replace(/  /g,'').replace("(*)", "").replace("(**)", ""),
            lat: "",
            lng: ""
        }
        element.consultorios.forEach(element=>{
            console.log(element.geolocalizacion.latitud, element.geolocalizacion.longitud)
            hospitalUnit.lat = element.geolocalizacion.latitud;
            hospitalUnit.lng = element.geolocalizacion.longitud;
        })
    
        hospitalList.push(hospitalUnit);
    })
    return hospitalList;
}

async function createHospitalJson(){
    let data = await createHospitalList();
    fs.writeFileSync("osdeHospitales.json", JSON.stringify(data));
}
