import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import { ProtectedRoute } from './context/ProtectedRoutes'
import Navbar from './components/Navbar/Navbar'
import CreateNewIssue from './Pages/CreateNewIssue'
import Unauthorized from './Pages/Unauthorized'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
  

  return (
    
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/login" element = {<Login />} />
      <Route path = "/register" element = {<Register />} />
      
      <Route path = "/home" element = { <ProtectedRoute requiredRoles={['admin', 'user']}> <Home /> </ProtectedRoute> }/>
      <Route path="/create-new-issue" element = {<ProtectedRoute requiredRoles={['admin', 'user']}><CreateNewIssue/></ProtectedRoute>} />
      <Route path="/admin-dashboard" element = {<ProtectedRoute requiredRoles={['admin']}><AdminDashboard/></ProtectedRoute>} />
      <Route path='/unauthorized' element = {<Unauthorized/>} />
        
     

      </Routes>
      
      </BrowserRouter>
    
  )
}

export default App
