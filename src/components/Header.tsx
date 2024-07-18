import { Link } from 'react-router-dom';
import anto from '../assets/anto.png';

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={anto} alt="Logo" className="h-10 mr-2" />
        </Link>
      </div>
      <div className="flex-none">
        <div className="lg:hidden">
          <details className="relative">
            <summary className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </summary>
            <ul className="menu menu-compact absolute right-0 bg-base-100 shadow-lg p-2 mt-2 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">register</Link></li>
              <li><Link to="/login">login</Link></li>
              {/* <li><Link to="/admin-login">admin</Link></li> */}
            </ul>
          </details>
        </div>
        <ul className="menu menu-horizontal p-0 hidden lg:flex">
          <li ><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/register">login</Link></li>
          <li><Link to="/login">Register</Link></li>
          {/* <li><Link to="/admin-login">admin</Link></li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
