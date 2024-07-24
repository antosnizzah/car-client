
import Slider from 'react-slick';
import { cars } from '../data/cars';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const About = () => {
  const settings = {
    dots: true ,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Our Cars</h1>
        <Slider {...settings}>
          {cars.map((car, index) => (
            <div key={index} className="p-4">
              <div className="bg-slate-50 rounded-lg shadow-lg overflow-hidden h-65">
                <img src={car.image} alt={car.name} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{car.name}</h2>
                  <p className="mt-2 text-gray-600">{car.specifications}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
};

export default About;
