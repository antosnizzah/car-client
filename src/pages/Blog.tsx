import React from 'react';
import { blogs } from '../data/blogs';


const Blog: React.FC = () => {
  return (
    <>

    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-69 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600">By {blog.author} on {blog.date}</p>
              <p className="mt-2 text-gray-600">{blog.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Blog;
