// src/components/Sidebar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  links: { to: string; label: string; icon: React.ReactNode }[];
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ links, title }) => {
  return (
    <div className="lg:flex lg:flex-col bg-gray-900 text-white w-64 min-h-screen">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <nav className="mt-10">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center py-3 px-8 text-white hover:bg-gray-700 mb-2 rounded-md"
          >
            {link.icon}
            <span className="ml-4">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
