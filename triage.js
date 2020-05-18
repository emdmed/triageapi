console.log("TRIAGEJS LOADED")

let triageapi = {
    render
}

//append a card to an element
function render(DOMelement, type){
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

    return elementToAppend;
}