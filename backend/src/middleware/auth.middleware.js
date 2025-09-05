import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import "dotenv/config";


export async function protectRoute (req, res, next) {
    try{
        const token = req.cookies.jwt;
        console.log(jwt);
        if(!token){ 
            return res.status(401).json({message : "Unauthorized, token missing"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message : "Unauthorized- invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message : "Unauthorized - user Not Found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error);
    }
}