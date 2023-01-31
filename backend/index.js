const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const users = require("./db/user")
app.use(express.json());
app.use(cors());
app.post("/signup",async (req,res)=>{
        let user = new users(req.body);
        let result = await user.save();
        res.send(result)
})
app.listen(5000);