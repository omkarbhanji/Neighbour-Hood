import React from 'react'
import { useState } from 'react';
import { createNewIssue } from '../services/issueService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateNewIssue = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    areaId: user.areaId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createNewIssue(formData);
    console.log(result);
    if(result.data.success){
        alert('Issue added successfully');
        navigate(-1);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create New Issue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

     
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter issue title"
          />
        </div>


      
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the issue"
          />
        </div>


       
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Road">Road</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>
        </div>


       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit Issue
        </button>

      </form>
    </div>
  )
}

export default CreateNewIssue
