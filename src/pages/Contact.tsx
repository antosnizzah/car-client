import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage = {
      name,
      email,
      contactNumber,
      message,
      timestamp: new Date().toISOString(),
    };

    const storedMessages = localStorage.getItem('messages');
    let messages = [];

    if (storedMessages) {
      try {
        messages = JSON.parse(storedMessages);
      } catch (error) {
        console.error('Error parsing messages from localStorage:', error);
      }
    }

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    setName('');
    setEmail('');
    setContactNumber('');
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <div className="bg-beige p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Here to <span className="text-red-500">help</span></h1>
      <div className="flex flex-col md:flex-row justify-between">
        <form onSubmit={handleSubmit} className="md:w-1/2 mr-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name..."
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number..."
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 mb-4 border border-gray-300 rounded h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Send message →
          </button>
        </form>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Join our newsletter</h2>
          <p className="mb-6">Add your details and you’ll receive our quarterly email, including what’s happening with the wildlife, nature, and communities around Lewa House.</p>
          <input
            type="email"
            placeholder="Enter your email address..."
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <button className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600">
            Sign up →
          </button>
          <div className="mt-10">
            <h3 className="text-lg font-semibold">For bookings, rates & reservations:</h3>
            <a href="mailto:info@lewshouse.com" className="block text-blue-500">info@lewshouse.com</a>
            <p className="mt-4">
              <strong>Alternatively contact us at:</strong><br />
              <a href="mailto:info@lewshouse.com" className="block text-blue-500">info@lewshouse.com</a>
              <span>+254 (0)710 791503</span><br />
              <span>Lewa House Pmb Ltd</span><br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
