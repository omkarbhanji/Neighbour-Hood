import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { voteIssue } from '../services/voteServices';

const IssueCard = ({issue, refreshIssues}) => {

  const {token} = useAuth();

  const [userVote, setUserVote] = useState(null);

  const handleVote = async (type) => {
    try{

      if(userVote === type){
        setUserVote(null);
      }else{
        setUserVote(type);
      }


      await voteIssue(issue._id, type);
      refreshIssues();
      console.log("vote Successfull")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4 border">

      
      <h3 className="text-lg font-semibold text-gray-800">
        {issue.title}
      </h3>

     
      <p className="text-gray-600 mt-2">
        {issue.description}
      </p>

     
      <p className="text-sm text-gray-500 mt-2">
        Category: {issue.category}
      </p>

     
      <p className="text-sm text-gray-500 mt-2">
        Reported By: {issue.reportedBy}
      </p>

    
      <p className="text-sm text-gray-500 mt-2">
        Status: {issue.status}
      </p>


      
      <div className="flex items-center gap-4 mt-4">

        {/* <button className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        onClick={()=>handleVote("upvote")}
        > */}

          <button className={`p-2 rounded border transition
    ${
      userVote === "upvote"
        ? "bg-green-500 text-white border-green-500"
        : "bg-transparent text-gray-600 border-gray-300 hover:bg-green-100"
    }`}
        onClick={()=>handleVote("upvote")}
        >
          👍 {issue.upvotes}
        </button>

        {/* <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        onClick={()=>handleVote("downvote")}
        > */}

         <button className={`p-2 rounded border transition
    ${
      userVote === "downvote"
        ? "bg-red-500 text-white border-red-500"
        : "bg-transparent text-gray-600 border-gray-300 hover:bg-red-100"
    }`}
        onClick={()=>handleVote("downvote")}
        >


          👎 {issue.downvotes}
        </button>

      </div>

    </div>
  );
}

export default IssueCard
