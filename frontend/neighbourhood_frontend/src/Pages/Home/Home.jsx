import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'
import { getIssuesByArea } from '../../services/issueService';
import IssueCard from '../../components/IssueCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [issues, setIssues] = useState([]);

  // useEffect(()=>{
  //   const fetchIssue = async()=> {
  //     try{
  //       console.log(user.areaId);
  //       const ress = await getIssuesByArea(user.areaId);
  //       console.log(ress.data.data);
  //       setIssues(ress.data.data);
  //     }catch(err){
  //       console.log(err.message);
  //     }
  //   }
  //   fetchIssue();
  // }, []);


  const fetchIssue = async()=> {
      try{
        console.log(user.areaId);
        const ress = await getIssuesByArea(user.areaId);
        console.log(ress.data.data);
        setIssues(ress.data.data);
      }catch(err){
        console.log(err.message);
      }
    };

    useEffect(()=> {
      if(user){
        fetchIssue();
      }
    }, [user]);





  const handleClick = () => {
    navigate('/create-new-issue');
  }

  return (

    <div className="flex max-w-7xl mx-auto mt-6 gap-8">


    <div className="flex-1 space-y-4" >

      {issues.map((issue) => (
        <IssueCard key={issue._id} 
        issue={issue}
        refreshIssues = {fetchIssue}
        />
      ))}

    </div>

    <div className="w-64">
    
      <button className='w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600' onClick={handleClick}>
        + Create New Issue
      </button>
     
      


    </div>

     

    </div>
  )
}

export default Home