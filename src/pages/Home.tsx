import { Link } from 'react-router-dom';
import Services from './services';
import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';



const Home = () => {
    return (
      <>
      <Header />
      <div className="hero min-h-screen" style={{ backgroundImage: `url('https://i.pinimg.com/564x/8b/14/48/8b1448c345668165afa67d6a1955b2f1.jpg')` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Online Car Booking</h1>
            <p className="mb-5">"Need a ride? 🚗✨ Book in a snap with [Anthony co lltc]! Fast, easy, and always reliable. Your adventure awaits! 🌟🚀"</p>
            <button className="btn btn-primary"><Link to="/login">Learn more</Link></button>
            {/* <li><Link to="/login">Register</Link></li> */}
          </div>
        </div>
      </div>

      <About />
      <Blog />
      <Services />
      <Contact />
      <Footer/>
      </>
    );
  }
  
  export default Home;
  