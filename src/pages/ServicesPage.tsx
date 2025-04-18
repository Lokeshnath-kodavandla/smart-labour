import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { getAllServices, searchServices, Service } from '../data/services';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  useEffect(() => {
    const allServices = getAllServices();
    setServices(allServices);
    setFilteredServices(allServices);
  }, []);
  
  useEffect(() => {
    let results = services;
    
    // Apply search filter
    if (searchTerm) {
      results = searchServices(searchTerm);
    } else {
      results = [...services];
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(service => service.category === selectedCategory);
    }
    
    setFilteredServices(results);
  }, [searchTerm, selectedCategory, services]);
  
  // Get unique categories
  const categories = Array.from(new Set(services.map(service => service.category)));
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services (A to Z)
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8 text-primary-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From appliance repair to zinc roofers — we've got all your labour needs covered.
          </motion.p>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-md">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search services..." 
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <select 
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services List */}
      <section className="section">
        <div className="container">
          {filteredServices.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredServices.map((service) => (
                <motion.div 
                  key={service.id} 
                  className="service-card overflow-hidden group"
                  variants={fadeIn}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-neutral-600 mb-4">{service.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-sm">Starting from ₹{service.pricing.basic}</span>
                      <Link 
                        to={`/services/${service.id}`} 
                        className="flex items-center font-medium text-primary-600 hover:text-primary-700"
                      >
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No services found</h3>
              <p className="text-neutral-600 mb-6">
                We couldn't find any services matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }} 
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Service Categories */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">Service Categories</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Browse our services by category to find exactly what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Set(services.map(service => service.category))).map((category) => (
              <div 
                key={category} 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-neutral-600 mb-3">
                  {services.filter(s => s.category === category).length} services available
                </p>
                <button 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Browse Services <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Book a Service CTA */}
      <section className="section bg-primary-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Book a Service?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Our professionals are ready to help you with any job, big or small.
          </p>
          <Link to="/book" className="btn bg-white text-primary-700 hover:bg-primary-100 hover:text-primary-800 text-lg px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;