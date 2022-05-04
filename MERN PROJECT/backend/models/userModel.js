const mongoose  = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength: [4,"name should have more than 4 characters"]
    },
    email:{
        type: String,
        required: [true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should be greater than equal to 8 characters"],
        select: false  //this means ehne we find the details of the userr then it'll not give the password of user and rest details will be given

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
        type: String,
        default: "User",
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
       next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT Token  //ek token generate krenge aur cookie mein store krenge, iss token se humare server ko pta chaljaega ki ye same user aur website access krpaega

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//genearting password reset token

userSchema.methods.getResetPasswordToken  =function(){
    //generating token

    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and add to user schema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};

module.exports = mongoose.model("user",userSchema);