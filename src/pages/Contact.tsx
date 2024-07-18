import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(path-to-your-background-image.png)' }}>
      <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0 lg:mr-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">23, KEnya<br />75012 Kutus</p>
        <p className="mb-4">hello@mikechemardin.com</p>
        <p className="mb-4">mike.chemardin</p>
        <p className="mb-4">+25419530144</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Get in Touch</h2>
        <p className="mb-4 text-center">Feel free to drop us a line below!</p>
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
