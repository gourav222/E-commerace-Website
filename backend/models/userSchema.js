const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the user name'],
        maxLength:[50,'Max length should exceeds more than 50 characters'],
        minLength:[3,'Please enter valid name']
    },
    email:{
        type:String,
        required:[true,'Please enter the user mail Id'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter the valid password'],
        select:false,
        minLength:[8,'Password should at least 8 characters']
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        next();
    this.password = await bcryptjs.hash(this.password,10);    
})
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
userSchema.methods.comparePassword = function(enterPassword){
    return bcryptjs.compare(enterPassword,this.password)
}
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 *60 * 1000;
    return resetToken;
}
module.exports = mongoose.model("users",userSchema);