const mongoose = require("mongoose");
const initData  = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to db")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL); 
}

const iniDB = async ()=>{
   await Listing.deleteMany({});
   initData.data =  initData.data.map((obj)=>({...obj,owner:"66cca5894872db30b869ef58"}));
   await Listing.insertMany(initData.data);
   console.log("Data was initialized");
   
}
iniDB();