const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"User name is Required"],
        minLength:[5,"Name must be at least 5 chars"],
        maxLength:[50,"Name must be less than 50 chars"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"User email is required"],
        unique:true,
        lowercase:true,
        unique:[true,"Already Registered"]
    },
    password:{
        type:String,
        select:false
    },
    forgetPasswordToken:{
        type:String
    },
    forgetPasswordExpiryData:{
        type:Date
    }
},{
    timestamps: true
});

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id,email:this.email},process.env.SECRET,{expiresIn : '24h'}
        )
    }
}

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;