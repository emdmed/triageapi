console.log("loaded")

triageAPI.requestEbadgeDataFromLocalstorage()

var insurance

$("body").on("click", "#saveEbadge", function(){
    if($("#hcinsurance1").prop("checked") === true){
        insurance = "healthinsurance1"
    } else if($("#hcinsurance2").prop("checked") === true){
        insurance = "healthinsurance2"
    } else if($("#hcinsurance3").prop("checked") === true){
        insurance = "healthinsurance3"
    }

    const ebadgeData = {
        id: $("#uniqueID").val().trim(),
        insurance: insurance
    }

    localStorage.setItem("EBADGE", JSON.stringify(ebadgeData))
    new QRCode(document.getElementById("renderPersonalEbadge"), `http://localhost:3000/ebadge/em?id=${ebadgeData.id}&insurance=${ebadgeData.insurance}`);

    $("#qrsdiv").show("fast")

    alert("EBADGE saved!")
    
})

