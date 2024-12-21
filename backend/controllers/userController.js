const userModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')


//login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message: "Invalid Credentials"})
        }
        const token = createToken(user._id)
        res.status(200).json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: "Internal server error"})       
    }
}

const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET
    )
}

const registerUser = async (req, res) => {
    const {name,password,email} = req.body;
    
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({success:false,message: "User already exists"})
        }
        //validating email format and strong password
        if(!validator.isEmail(email) ){
            return res.status(400).json({success:false,message: "Invalid email"})
        }
        if(password.length < 8){
            return res.status(400).json({success:false,message: "Password should be at least 8 characters long"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = userModel.create({name,email,password:hashedPassword})

        const token = createToken(user._id)

        res.status(201).json({success:true,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message: "Internal server error"})
    }
}

module.exports = {loginUser,registerUser}