import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";


export async function signup(req, res){
    
    const {fullName, email, password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400). json({message : "Invalid email format"});
        }

        const existingUser  = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "Email already exist, please use a different one"}); 
        }

        const idx = Math.floor(Math.random() * 100) +1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullName,   
            password,
            profilePic : randomAvatar,
        });

        const token = jwt.sign({userId :newUser._id}, process.env.JWT_SECRET_KEY, {  
            expiresIn : '1d'
        })

        res.cookie("jwt", token, {
            maxAge : 24*60*60*1000,
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'strict',
        })

        res.status(201).json({success : true, user : newUser});


    } catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function login(req, res){
    res.send('Login Route');
}

export async function logout(req, res){
    res.send('Logout Route');
}