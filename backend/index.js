// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("./db/config");
// const users = require("./db/user")
// app.use(express.json());
// app.use(cors());
// app.post("/signup",async (req,res)=>{
//         let user = new users(req.body);
//         let result = await user.save();
//         res.send(result)
// })
// app.listen(5000);

const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:'./config/.env'})
process.on("uncaughtExceptionMonitor",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})
require("./db/config");
const server = app.listen(process.env.port,() => {
        console.log(`Server is running on port ${process.env.port}`);
})
process.on("unhandledRejection",(err) => {
    console.log(`Error",${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)
    server.close(() => {
        process.exit(1);
    }); 
})