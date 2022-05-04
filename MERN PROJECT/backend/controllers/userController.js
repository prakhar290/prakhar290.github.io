const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
//register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const{name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"ProfilePicURL"
        },
    });

    sendToken(user,201,res);
});

//login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const{email,password} = req.body;
    //checking if user has given email and password both

    if(!email || !password){
        return next(new ErrorHander("please enter email and password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("invalid email or password", 401));
    }
   
    sendToken(user,200,res);
});

//logout user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "logged Out",
    })
})


//forgot password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHander("user not found", 404))
    }

    //get reset password token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is :- \n \n ${resetPasswordUrl}\n\n If you have not requested this email then please ignore it`;

    try{

        await sendEmail({
            email: user.email,
            subject: `Ramp Store Password Recovery`,
            message,

        });
        res.status(200).json({
            success: true,
            message: `eamil sent to ${user.email} successfully`,
        })

    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHander(error.message,500));
    }
})