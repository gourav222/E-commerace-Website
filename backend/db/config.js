//To Establish a connection with the database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI,{
}).then(() => {
    console.log (`connections successfull`);  
}).catch((e) => {
    console.log(e);
})