import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);

        // Save the token to localStorage or a secure cookie
        localStorage.setItem('token', result.token);

        // Redirect to a protected route or handle success as needed
        navigate('/');
      } else {
        const errorResult = await response.json();
        console.error('Failed to login:', errorResult);
        setLoginError(errorResult.error || 'Login failed.'); // Set an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Internal Server Error. Please try again.'); // Set an error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-blue font-sans">
      <div className="px-10 py-8 text-left bg-form-bg shadow-lg rounded-lg max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        {loginError && (
          <p className="text-xs text-center text-red-500">{loginError}</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mt-4">
            <div>
              <label className="block text-white" htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className="mt-4">
              <label className="block text-white" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
