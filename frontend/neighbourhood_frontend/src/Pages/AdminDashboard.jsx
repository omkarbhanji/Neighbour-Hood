import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../services/adminServices';
import AdminIssueCard from '../components/AdminIssueCard';

const AdminDashboard = () => {

    const [issues, setIssues] = useState([]);
    const [areaFilter, setAreaFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(()=> {
        
        fetchIssues();
    }, [areaFilter, categoryFilter]);

        const fetchIssues = async () => {
        console.log(areaFilter);
        console.log(categoryFilter);
        const result = await getFilteredData (areaFilter, categoryFilter);
        console.log("This is ",  result.data);
        setIssues(result.data);
        
    }

   

  return (
    <div className="p-6">

  
    <div className="flex gap-4 mb-6">

      <select
        value={areaFilter}
        onChange={(e) => setAreaFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Areas</option>
        <option value="69ae9c89bc6269f5264ed930">Wakad</option>
        <option value="area2">Hinjewadi</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="Road">Road</option>
        <option value="Water">Water</option>
        <option value="Sanitation">Sanitation</option>
      </select>

    </div>


   
    <div>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found</p>
      ) : (
        issues.map((issue) => (
          <AdminIssueCard
            key={issue._id}
            issue={issue}
            refreshIssues={fetchIssues}
          />
        ))
      )}

    </div>

  </div>
  )
}

export default AdminDashboard
