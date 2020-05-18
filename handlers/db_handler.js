const ApiKeyGen = require("../models/apiKeyGen")
const accessRecord = require("../models/accessRecord");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db_handler = {
   createApiKey,
   findApiKey,
   createAccessRecord
}

async function createApiKey(email){
    console.log("APIKEY")
    let duplicatedEmail = await findApiKey(email);
    if(duplicatedEmail.length > 0){
        console.log("Email already in use")
    } else {
        let date = new Date();
        await bcrypt.hash(email+date, saltRounds, async function(err, hash) {
            await ApiKeyGen.create({creation_date: date, email, apiKey: hash.substr(0, 15)})
        });
    }
}

async function createAccessRecord(){
    await accessRecord.create({creation_date: new Date()});
}

async function findApiKey(email){
    let found = ApiKeyGen.find({email: email});
    return found;
}

module.exports = db_handler;