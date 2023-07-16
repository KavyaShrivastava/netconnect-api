import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

//@desc register user 
//@route POST /api/v1/users/register

export const registerUserCtrl = asyncHandler(async(req,res) =>{
    const {fullname, email, password} = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        throw new Error("User already exists")
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
        throw new Error(
        "Password must be 6-20 characters long, contain at least one uppercase letter, one lowercase letter, and one digit."
        );
    }
    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
            fullname,
            email,
            password: hashedPassword
    })
        
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully'
    })

})

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

export const loginUserCtrl = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    //find user in db by email
    const userFound = await User.findOne({email});
    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status: 'success',
            message: "You have logged in successfully",
            userFound,
            token: generateToken(userFound?._id)

        })
    }
    else{
        throw new Error("Invalid Login")
    }
})

export const getUserProfileCtrl = asyncHandler(async(req, res)=>{
    const token = getTokenFromHeader(req)
    const verified = verifyToken(token)
    res.json({
        message: "Welcome to profile page"
    })
})