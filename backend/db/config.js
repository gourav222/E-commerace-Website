//To Establish a connection with the database

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/e-commerce",{
    
}).then(() => {
    console.log (`connections successfull`);  
}).catch((e) => {
    console.log(e);
})