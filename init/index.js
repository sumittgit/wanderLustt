const mongoose = require("mongoose");
const listingData = require("./data.js");
const listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
};
const initdb = async ()=>{
    let data = await listing.insertMany(listingData);
};
initdb();