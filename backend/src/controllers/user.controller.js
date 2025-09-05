import User from "../models/user.model.js";


export async function getRcommendedUsers(req, res){
    try{

        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedusers = await User.find({
            $and : [
                { _id : { $ne : currentUserId } }, // exclude current user
                { $id : {$nin : currentUser.freinds}}, //exclude current users freind
                { isOnboarded : true},
            ]
        });

        if(!recommendedusers){
            return res.status(404).json({message : "No users found"});
        }

        res.status(200).json(recommendedusers);


    } catch (error){
        console.log("Error in getRcommendedUsers controller", error.message);
        res.status(500).json({message : "Internal server error"});
    }
}