const mongoose = require('mongoose');
const initData = require("./data.js")
const Listing = require("../models/listing.js")
main().then(
    (res)=>{
        console.log("Connectoin Established Sucessfully")
    }
)
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');  
}
let initDb = async ()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((el) =>({...el, owner: '68c9cf693689ab73cf9d0bb9', category: "no category"}))
    await Listing.insertMany(initData.data)
    console.log("Data Saved")
}
initDb();
