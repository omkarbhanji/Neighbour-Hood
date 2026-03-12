import React from "react";
import { updateIssueStatus } from "../services/adminServices";


const AdminIssueCard = ({ issue, refreshIssues }) => {
  const handleStatusChange = async (issueId, status) => {
    await updateIssueStatus(issueId, status);

    refreshIssues();
  };

 


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


      <div/>

      <select
        value={issue.status}
        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
        className="border rounded p-1 mt-2"
      >
        <option>Reported</option>
        <option>Under Review</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Rejected</option>
      </select>
    </div>
  );
};

export default AdminIssueCard;
