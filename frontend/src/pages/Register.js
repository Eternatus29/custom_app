import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerError, setRegisterError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        const errorResult = await response.json();
        console.error('Failed to register:', errorResult);
        setRegisterError(errorResult.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterError('Internal Server Error. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-blue font-sans">
      <div className="px-10 py-8 text-left bg-form-bg shadow-lg rounded-lg max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-center text-white">Register</h3>
        {registerError && (
          <p className="text-xs text-center text-red-500">{registerError}</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
          />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
