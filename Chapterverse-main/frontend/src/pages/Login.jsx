import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(formData.username==="" || formData.password==="" ){
        alert("All fields are required");
      }
      else{
        // console.log(formData);
        const response = await axios.post('https://chapterverse1.onrender.com/api/v1/sign-in', formData);
        // alert(response.data.message);
        console.log(response.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        //console.log(response.data.id);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile")
        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {
          alert('Login successful');
        }
        //navigate("/LogIn")
      }
      
      // Handle successful sign up (e.g., redirect to login page)
    } catch (err) {
      console.error('Error during login:', err);
      alert(err.response.data.message);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8F9] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-[#032B37] mb-6">Log In</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Username</label>
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
          <button
            type="submit"
            className="w-full bg-[#086D8A] text-white py-2 rounded-lg hover:bg-[#075A71] transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? <Link to="/SignUp" className="text-[#086D8A] hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
