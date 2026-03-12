import React, { useEffect, useState } from "react";
import { getAllAreas } from "../../services/areaServices";
import { registerNewUser } from "../../services/authServices";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
  const [areaList, setAreaList] = useState([]);
//   const [selectedArea, setSelectedArea] = useState("");

  const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        areaId: ""
    });

    const handleChange = (e)=> {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };
  useEffect(()=>{
    const fetchArea = async() => {
        
        try{
            const result = await getAllAreas();
            setAreaList(result.data.data);
        }catch(err){
            console.log(err);
        }
    }
    fetchArea();
  }, []);


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try{
        const res = await registerNewUser(formData);
        
        console.log(res.data.success)
        if(res.success){
            navigate('/home');
        }
        
    }
    catch(err){
        console.log(err)
        const message = err.response?.data?.message || "Something went wrong";
        console.log(message);
        alert(message);
    }
     
  };

  return ( 
  <div className='flex justify-center items-center h-screen bg-gray-100'>
    <form onSubmit = {handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80" >
    <h2 className="text-2xl font-bold mb-6 text-center">Register Now</h2>

    <input type="text" 
    name="name"
    placeholder="Name" 
    value={formData.name}
    onChange={handleChange} 
    required   
    />
    
    <input type="email" 
    name="email"
    placeholder="Email Address" 
    value={formData.email}
    onChange={handleChange} 
    required   
    />

    <input type="password" 
    name="password"
    placeholder="Password" 
    value={formData.password}
    onChange={handleChange} 
    required   
    />

    <select value={formData.areaId}
    name="areaId"
    onChange={handleChange}
    >

        <option value=""> -- Select Area-- </option>

        {
            areaList.map((area)=>(
                <option key = {area._id} value = {area._id}>
                    {area.name}
                </option>
            ))
        }

    </select>

        <button type="submit" 
    className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
        Register
        </button>

        <p className="text-sm text-center mt-4">
  Already have an account?
  <Link to="/login" className="text-blue-600 hover:underline ml-1">
    Login
  </Link>
</p>

</form>

  </div>
  )
}

export default Register;
