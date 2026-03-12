const Votes = require("../models/Votes");
const Issue = require("../models/Issues");
const Users = require("../models/Users");

exports.voteOnIssue = async (req, res) => {
   
  try {
    const { issueId, voteType } = req.body;
    const userId = req.user._id;

    const issue = await Issue.findById(issueId);

    if (!issue) {
        return res.status(404).json({message: "Issue not found"})
    }
    const existingVote = await Votes.findOne({userId, issueId});

    if(!existingVote){

        await Votes.create({
            userId,
            issueId, 
            voteType
        });

        if(voteType === "upvote") issue.upvotes += 1;
        if(voteType === "downvote") issue.downvotes += 1;

        await issue.save();

        return res.status(201).json({
            message: "Vote added", 
            upvotes: issue.upvotes, 
            downvotes: issue.downvotes});        
    }

    if(existingVote.voteType === voteType){
        await Votes.deleteOne({_id: existingVote._id});
        if(existingVote.voteType === "upvote"){
            issue.upvotes -= 1;
        }
        if(existingVote.voteType === "downvote"){
            issue.downvotes -= 1;
        }
        await issue.save();

        return res.status(201).json({
            message: "Vote removed", 
            upvotes: issue.upvotes, 
            downvotes: issue.downvotes}); 
    }

    if(existingVote.voteType === "upvote"){
        issue.upvotes -= 1;
        issue.downvotes += 1;
    }else{
        issue.downvotes -= 1;
        issue.upvotes += 1; 
    }

    existingVote.voteType = voteType;
    await existingVote.save();
    await issue.save();

    return res.status(201).json({
            message: "Vote updated", 
            upvotes: issue.upvotes, 
            downvotes: issue.downvotes}); 

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
