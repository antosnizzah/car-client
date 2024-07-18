
const services = [
  {
    title: 'Vehicle Rentals',
    description: 'We offer a wide range of vehicles for rent, from economy cars to luxury SUVs.',
    icon: '🚗'
  },
  {
    title: 'Chauffeur Services',
    description: 'Professional chauffeurs to drive you to your destination in style and comfort.',
    icon: '🧑‍✈️'
  },
  {
    title: 'Maintenance Services',
    description: 'Regular maintenance and check-ups to ensure your vehicle is in top condition.',
    icon: '🔧'
  },
  {
    title: 'Insurance Coverage',
    description: 'Comprehensive insurance options to keep you protected while on the road.',
    icon: '🛡️'
  }
];

const Services = () => {
  return (
    <div className="bg-gray-600 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="p-6 bg-white rounded-lg shadow-lg text-center">
                <div className="text-4xl">{service.icon}</div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">{service.title}</h3>
                <p className="mt-2 text-base text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
