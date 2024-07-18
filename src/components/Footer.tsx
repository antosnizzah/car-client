const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0">
        <p>Car Rental Company<br />Providing reliable car rental services since 2000</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-auto">
        <div className="mb-6 md:mb-0 md:mr-8">
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="list-none">
            <li><a href="/about" className="link link-hover">About Us</a></li>
            <li><a href="/services" className="link link-hover">Services</a></li>
            <li><a href="/contact" className="link link-hover">Contact</a></li>
            <li><a href="/faq" className="link link-hover">FAQ</a></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0 md:mr-8">
          <h4 className="font-bold mb-2">Contact</h4>
          <p>Email: info@carrental.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 1234 Street, City, Country</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
              <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
              <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
              <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
              <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

  