import React from 'react'
import { isLoggedIn } from '../../utils/auth';
import { Navigate } from "react-router-dom";
const Homepage = () => {
 if (!isLoggedIn()) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
          <p className="text-lg mb-6">Please log in or register to continue.</p>
          <a href="/login" className="text-blue-500 hover:underline">Login</a> | 
          <a href="/register" className="text-blue-500 hover:underline ml-2">Register</a>
        </div>
      </div>
    );
  }
  return <Navigate to="/my-todos" />

}

export default Homepage