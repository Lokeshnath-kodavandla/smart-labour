import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceById, Service } from '../data/services';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceById(serviceId);
      if (serviceData) {
        setService(serviceData);
      }
      setLoading(false);
    }
  }, [serviceId]);
  
  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container text-center">
          <AlertCircle className="h-16 w-16 text-primary-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-lg text-neutral-600 mb-8">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/services" className="btn btn-primary">
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-white mb-6 hover:text-primary-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Services
          </button>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {service.name}
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mb-6 text-primary-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {service.shortDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to={`/book/${service.id}`} className="btn bg-white text-primary-700 hover:bg-primary-100 hover:text-primary-800">
              Book This Service
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Service Details */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">About This Service</h2>
              <p className="text-lg text-neutral-700 mb-8">
                {service.description}
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to={`/book/${service.id}`} className="btn btn-primary">
                Book Now
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-64 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-6">Pricing Options</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Basic Package</h4>
                        <span className="text-xl font-bold">£{service.pricing.basic}</span>
                      </div>
                      <p className="text-neutral-600 text-sm">
                        Essential service covering basic requirements.
                      </p>
                    </div>
                    
                    <div className="bg-primary-50 rounded-lg p-4 border border-primary-200 relative">
                      <div className="absolute -top-3 right-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Standard Package</h4>
                        <span className="text-xl font-bold">₹{service.pricing.standard}</span>
                      </div>
                      <p className="text-neutral-600 text-sm">
                        Comprehensive service with additional features.
                      </p>
                    </div>
                    
                    <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Premium Package</h4>
                        <span className="text-xl font-bold">₹{service.pricing.premium}</span>
                      </div>
                      <p className="text-neutral-600 text-sm">
                        Complete solution with priority service and extras.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-4">
                      * Prices may vary depending on the specific requirements of your project. Contact us for a custom quote.
                    </p>
                    <Link to="/contact" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Need a custom quote? Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section bg-neutral-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto">
            Book our {service.name} service today and experience professional quality work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/book/${service.id}`} className="btn btn-primary">
              Book This Service
            </Link>
            <Link to="/services" className="btn btn-outline">
              Browse Other Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;