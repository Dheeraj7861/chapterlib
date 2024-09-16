import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });
  const navigate = useNavigate()
  const [error, setError] = useState('');

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const {name, value} = e.target;
    console.log(name, value);
    setFormData({...formData, [name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(formData.username==="" || formData.email==="" || formData.password==="" || formData.address===""){
        alert("All fields are required");
      }
      else{
        console.log(formData);
        const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-up', formData);
        alert(response.data.message);
        navigate("/LogIn")
      }
      
      // Handle successful sign up (e.g., redirect to login page)
    } catch (err) {
      console.error('Error during sign up:', err);
      // setError('Sign up failed. Please try again.');
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8F9] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-[#032B37] mb-6">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Userame</label>
            <input
              type="text"
              id="name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#086D8A]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#086D8A]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#086D8A]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#086D8A]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#086D8A] text-white py-2 rounded-lg hover:bg-[#075A71] transition duration-300"
            // onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Already have an account? <Link to="/LogIn" className="text-[#086D8A] hover:underline">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
