let mongoose = require("mongoose")
let prod = true;
let env_var = require("./env");

let config = {
    url: {
        production: "",
        dev: "",
        local: ""
    },
    DB: env_var.dburl,
    connectToDB: async function(){
        try{
            await mongoose.connect(this.DB, {useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Connected to DB");
        }catch{
            console.log("Error connecting to DB, retrying in 10");
            setTimeout(() => {
                this.connectToDB();
            }, 10000);
         
        }
    },
    environment: {
        production: prod,
        set(){
            if(this.production === false){
                config.connectToDB = ()=>{
                    console.log("no DB")
                }
            }
        }
    }
}

module.exports = config;
