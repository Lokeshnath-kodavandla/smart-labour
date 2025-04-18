import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulating API call to send the message
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would normally send the data to your MongoDB backend
      console.log('Contact form data:', formState);
      
      setIsSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8 text-primary-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions or need to schedule a service? We're here to help!
          </motion.p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8 mb-8">
                <div className="flex">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                    <p className="text-neutral-600">
                      123 Labour Street, Workington, WK1 2LB
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
                    <p className="text-neutral-600">
                      <a href="tel:+441234567890" className="hover:text-primary-600 transition-colors">
                        +44 123 456 7890
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Address</h3>
                    <p className="text-neutral-600">
                      <a href="mailto:info@smartlabour.com" className="hover:text-primary-600 transition-colors">
                        info@smartlabour.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                    <p className="text-neutral-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Emergency Service</h3>
                <p className="text-neutral-600 mb-4">
                  Need urgent assistance? Our emergency team is available 24/7 for critical situations.
                </p>
                <a 
                  href="tel:+441234567890" 
                  className="flex items-center justify-center btn btn-primary"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Line
                </a>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {isSuccess && (
                  <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      Thank you for your message! We've received your inquiry and will get back to you as soon as possible.
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Your Name*
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formState.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                          errors.name ? 'border-red-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address*
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                          errors.email ? 'border-red-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Subject*
                      </label>
                      <select 
                        name="subject" 
                        value={formState.subject}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                          errors.subject ? 'border-red-500' : 'border-neutral-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Service Request">Service Request</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Job Application">Job Application</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Message*
                    </label>
                    <textarea 
                      name="message" 
                      value={formState.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                        errors.message ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn btn-primary flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Visit us at our main office or give us a call to schedule a service.
            </p>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg h-[400px] relative">
            {/* This would typically be replaced with an actual map integration */}
            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
              <p className="text-neutral-500 text-center p-4">
                Map would be integrated here (Google Maps, Mapbox, etc.)<br />
                <span className="block mt-2 text-sm">123 Labour Street, Workington, WK1 2LB</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How do I book a service?",
                answer: "You can book a service through our website by visiting the Services page, selecting the service you need, and following the booking process. Alternatively, you can call our customer service line or send us a message through the contact form."
              },
              {
                question: "What areas do you serve?",
                answer: "We currently provide services throughout the Greater London area, including all surrounding boroughs. For specific inquiries about your location, please contact our customer service team."
              },
              {
                question: "How are your professionals vetted?",
                answer: "All our professionals undergo rigorous background checks, skill assessments, and reference verification. We also require proof of qualifications and relevant certifications for specialized services."
              },
              {
                question: "What if I'm not satisfied with the service?",
                answer: "We stand by our 100% satisfaction guarantee. If you're not completely satisfied with the service provided, please contact us within 48 hours, and we'll make it right - either by sending a professional back or offering a refund."
              },
              {
                question: "Do you offer emergency services?",
                answer: "Yes, we offer emergency services for critical situations like electrical failures, plumbing emergencies, and lockouts. Our emergency line is available 24/7."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;