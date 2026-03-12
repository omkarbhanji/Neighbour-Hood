// create issue
//get issues by areas

// get single issue

// update issue status

// delete issue (admin)

const Areas = require('../models/Area');
const Issues = require("../models/Issues");
const User = require('../models/Users');
const mongoose = require('mongoose');

exports.getFilteredIssues = async(req, res) => {
    const filter = {};

    if(req.query.areaId) {
        filter.areaId = new mongoose.Types.ObjectId(req.query.areaId);
    }
    if(req.query.category) {
        filter.category = req.query.category;
    }

    try{
        console.log(filter);
        const result = await Issues.find(filter);
        console.log(result);
        return res.status(200).json({success: true, data: result});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

exports.getIssuesByAreas = async (req, res) => {

    const areaId = req.params.areaId;
    
    try{
      console.log(areaId);

        const result = await Issues.find({areaId: areaId});
        return res.status(200).json({data: result});

    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.getIssueById = async(req, res)=> {
    const issueId = req.params.issueId;

    try{
        const result = Issues.findById(issueId);
        return res.status(200).json({data: result});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.createIssue = async (req, res) => {
    const {title, description, category, areaId} = req.body;
    try{
       const newIssue = new Issues ({
        title: title,
        description: description,
        category: category,
        areaId: areaId,
        // reportedBy: User.name
        // imageUrl: imageUrl
       });
       
       await newIssue.save();
       return res.status(201).json({success: true, data: newIssue});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

exports.updateIssueStatus = async( req, res) => {
    const {issueId, updatedStatus} = req.body;
    try{
        const issue = await Issues.findByIdAndUpdate(issueId, {"status": updatedStatus});
        return res.status(200).json({ "success": true, data: issue});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

exports.deleteIssueById = async(req, res) => {
    const issueId = req.params.issueId;

    try{
        const result = Issues.findById(issueId);
        if(result){
            await Issues.deleteOne(issueId);
            return res.status(200).json({message:"Deleted successfully", result: result})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

