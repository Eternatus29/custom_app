import React, { useState } from 'react';
import { useSpring } from '@react-spring/web'; // For animations

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1, // Directly set the final state of the animation
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/users/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    });
  };


return (
    <div className="flex items-center justify-center min-h-screen bg-dark-blue text-white">
      <div className="max-w-md w-full bg-white bg-opacity-30 p-8 rounded-lg shadow-lg animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white">Message</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={handleMessageChange}
              className="w-full bg-transparent border border-white text-white py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;