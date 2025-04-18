import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Shield, Clock, ThumbsUp, PenTool as Tool } from 'lucide-react';
import { getAllServices } from '../data/services';

const HomePage: React.FC = () => {
  const featuredServices = getAllServices().slice(0, 3);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your One-Stop Solution for Labour Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                From electricians to gardeners — we've got it all covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/services" className="btn bg-white text-primary-700 hover:bg-primary-100 hover:text-primary-800">
                  View Services
                </Link>
                <Link to="/book" className="btn bg-secondary-600 hover:bg-secondary-700 text-white">
                  Book Now
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <img 
                src="https://images.pexels.com/photos/8960464/pexels-photo-8960464.jpeg" 
                alt="Workers providing services" 
                className="rounded-xl shadow-xl mx-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="font-semibold text-neutral-800">100% Guaranteed</p>
                  <p className="text-sm text-neutral-600">Quality service or money back</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="container mt-10 md:mt-16 relative z-10">
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="What service do you need?" 
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <Link to="/services" className="btn btn-primary whitespace-nowrap">
                Find Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold mb-4">Why Choose Smart Labour?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We connect you with skilled professionals for all your labor needs, delivering convenience, quality, and reliability.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Star className="h-10 w-10 text-primary-600" />,
                title: "Quality Work",
                description: "Our professionals are vetted and skilled to deliver excellence on every job."
              },
              {
                icon: <Clock className="h-10 w-10 text-primary-600" />,
                title: "On-Time Service",
                description: "We respect your schedule and ensure punctual arrivals and timely completion."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary-600" />,
                title: "Fully Insured",
                description: "All our professionals are insured for your complete peace of mind."
              },
              {
                icon: <ThumbsUp className="h-10 w-10 text-primary-600" />,
                title: "Satisfaction Guaranteed",
                description: "If you're not completely satisfied, we'll make it right."
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold mb-4">Our Popular Services</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our most requested services, delivered by skilled professionals ready to help.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredServices.map((service, index) => (
              <motion.div 
                key={service.id}
                className="service-card overflow-hidden group"
                variants={fadeIn}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-neutral-600 mb-4">{service.shortDescription}</p>
                  <Link 
                    to={`/services/${service.id}`} 
                    className="flex items-center font-medium text-primary-600 hover:text-primary-700"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="section bg-neutral-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Getting help has never been easier. Our simple process connects you with skilled professionals in just a few steps.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Choose a Service",
                description: "Browse our wide range of services and select what you need help with."
              },
              {
                step: "2",
                title: "Book an Appointment",
                description: "Select a convenient date and time for our professional to visit."
              },
              {
                step: "3",
                title: "Get the Job Done",
                description: "Our skilled professional will arrive and complete the work to your satisfaction."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center relative"
                variants={fadeIn}
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary-200">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <ArrowRight className="text-primary-300 h-6 w-6" />
                    </div>
                  </div>
                )}
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/book" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-700 text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 mb-8 lg:mb-0"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to get started?</h2>
              <p className="text-xl text-primary-100 mb-6">
                Book a service today and experience the Smart Labour difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="btn bg-white text-primary-700 hover:bg-primary-100">
                  Book a Service
                </Link>
                <Link to="/contact" className="btn border border-white text-white hover:bg-primary-600">
                  Contact Us
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/3"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg text-neutral-800">
                <div className="flex items-center mb-4">
                  <Tool className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Quick Quote</h3>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Service Type</label>
                    <select className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Select a service</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="gardening">Gardening</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                      <input type="text" className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                      <input type="tel" className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                  </div>
                  <button type="button" className="w-full btn btn-primary">
                    Get Quote
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;