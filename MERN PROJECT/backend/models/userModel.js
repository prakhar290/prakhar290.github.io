const mongoose  = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("user",userSchema);