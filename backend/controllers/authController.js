const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const JWT_SECRET = "MYNAME IS OMAKR";

exports.register = async(req, res) => {
    try{
     const {name, email, password, roles, areaId} = req.body;

        console.log(req.body);

        const userExists = await User.findOne({email: email});
        console.log(userExists);

        if(userExists){
            console.log("User does exist")
            return res.status(400).json({success: false, message: "Email already present"});
        }
    
        const user = await User.create({name, email, password, roles, areaId});

        res.status(201).json({success: true, message: "User successfully created", user});
            

        }
        catch(err){
            console.log(err);
            res.status(400).json({message: "Invalid request", error: err.message});
        }
};

exports.login = async(req, res) => {
    try{
        console.log("This is req body : " + req.body.password);
        const {email, password} = req.body;
        console.log("This is " + email + " " + password);

        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            console.log("User dosent exist");
            return res.status(401).json({message: "Invalid credentials, user donsen't exist"});
        }
        console.log("Before checking: " +  user.password + " " + password);
        if(user.password != password){
            return res.status(401).json({message: "Invalid credentials, password didnt match"});
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        }, JWT_SECRET);

        const userDetails = {
            id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            areaId: user.areaId
        }

        return res.status(200).json({success: true, user: userDetails, token: token});

    }
    catch(err){
        return res.status(500).json({error: err.message});
    }

};