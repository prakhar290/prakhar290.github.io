const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const{name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
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

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

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
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //craeting token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    })
    if(!user){
        return next(new ErrorHander("Reset password token is invalid or expired", 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})


//get user details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });

})

//update user password

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

   
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password doesn't matched", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
   
    sendToken(user,200,res);
});


//update user profile

exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
   
   const newUserData = {
       name: req.body.name,
       email: req.body.email,

   }
   //adding cloudinary for images to update

   if(req.body.avatar !== ""){
       const user = await User.findById(req.user.id);

       const imageId = user.avatar.public_id;

       await cloudinary.v2.uploader.destroy(imageId);

       const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }
   }

   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
       new: true,
       runValidators: true,
       useFindAndModify: false,
   });

   res.status(200).json({
       success: true,
   });
});


//Get all users

exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});


//Get user details for admin

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`Usr doenot exist with id ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//update user Role  --Admin

exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
   
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
 
    }
 
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
 
    res.status(200).json({
        success: true,
    });
 });
 
 //delete user --Admin

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
    const user = await User.findById(req.params.id);
    //we will remove cloudinary for images later
 
    if(!user){
        return next(new ErrorHander(`User Does not exist with id: ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "user deleted succesfully",
    });
 });
 
 