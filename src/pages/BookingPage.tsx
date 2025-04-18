import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getServiceById, getAllServices, Service } from '../data/services';

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId?: string }>();
  const navigate = useNavigate();
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    date: '',
    time: '',
    description: '',
    selectedPackage: 'standard'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const services = getAllServices();
    setAllServices(services);
    
    if (serviceId) {
      const service = getServiceById(serviceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [serviceId]);
  
  const handleServiceSelection = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };
  
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
  
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 2) {
      if (!formState.name.trim()) newErrors.name = 'Name is required';
      if (!formState.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formState.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formState.address.trim()) newErrors.address = 'Address is required';
      if (!formState.city.trim()) newErrors.city = 'City is required';
      if (!formState.postcode.trim()) newErrors.postcode = 'Postcode is required';
    }
    
    if (step === 3) {
      if (!formState.date) newErrors.date = 'Date is required';
      if (!formState.time) newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulating API call to save the booking
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would normally send the data to your MongoDB backend
      console.log('Booking data:', {
        service: selectedService?.id,
        package: formState.selectedPackage,
        ...formState
      });
      
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getAvailableTimes = () => {
    return [
      '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];
  };
  
  // Get tomorrow's date for the min date in the date picker
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  if (isSuccess) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container max-w-3xl">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-neutral-600 mb-8">
              Thank you for booking with Smart Labour. We've received your request for{' '}
              {selectedService?.name}. A confirmation email has been sent to {formState.email}.
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-neutral-500 text-sm">Service</p>
                  <p className="font-medium">{selectedService?.name}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Package</p>
                  <p className="font-medium capitalize">{formState.selectedPackage}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Date & Time</p>
                  <p className="font-medium">{formState.date} at {formState.time}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Location</p>
                  <p className="font-medium">{formState.address}, {formState.city}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/')} 
                className="btn btn-primary"
              >
                Return to Home
              </button>
              <button 
                onClick={() => navigate('/services')} 
                className="btn btn-outline"
              >
                Browse More Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen bg-neutral-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`flex-grow flex flex-col items-center ${step < 4 ? 'relative' : ''}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step 
                        ? 'bg-primary-600 text-white' 
                        : currentStep > step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {step}
                  </div>
                  <p className={`mt-2 text-sm ${currentStep === step ? 'text-primary-600 font-medium' : 'text-neutral-500'}`}>
                    {step === 1 ? 'Service' : step === 2 ? 'Details' : step === 3 ? 'Schedule' : 'Confirm'}
                  </p>
                  
                  {step < 4 && (
                    <div 
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        currentStep > step ? 'bg-green-500' : 'bg-neutral-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
                
                {selectedService ? (
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-200 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                        <img 
                          src={selectedService.imageUrl} 
                          alt={selectedService.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                        <p className="text-neutral-600">{selectedService.shortDescription}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-neutral-600 mb-4">
                      Please select the service you'd like to book:
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {allServices.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => handleServiceSelection(service)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedService?.id === service.id 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src={service.imageUrl} 
                            alt={service.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-neutral-500">From ₹{service.pricing.basic}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleNextStep} 
                    disabled={!selectedService}
                    className={`btn ${selectedService ? 'btn-primary' : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name*
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
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number*
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formState.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                        errors.phone ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Service Location</h3>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address*
                    </label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formState.address}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                        errors.address ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        City*
                      </label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formState.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                          errors.city ? 'border-red-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Postcode*
                      </label>
                      <input 
                        type="text" 
                        name="postcode" 
                        value={formState.postcode}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                          errors.postcode ? 'border-red-500' : 'border-neutral-300'
                        }`}
                      />
                      {errors.postcode && (
                        <p className="mt-1 text-sm text-red-500">{errors.postcode}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={handlePrevStep} 
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNextStep} 
                    className="btn btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Schedule Service</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Preferred Date*
                    </label>
                    <input 
                      type="date" 
                      name="date" 
                      min={getTomorrowDate()}
                      value={formState.date}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                        errors.date ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Preferred Time*
                    </label>
                    <select 
                      name="time" 
                      value={formState.time}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${
                        errors.time ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    >
                      <option value="">Select a time</option>
                      {getAvailableTimes().map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Package Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['basic', 'standard', 'premium'].map((packageType) => (
                      <div 
                        key={packageType}
                        onClick={() => setFormState({...formState, selectedPackage: packageType})}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          formState.selectedPackage === packageType 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="text-center">
                          <p className="font-medium capitalize">{packageType}</p>
                          <p className="text-primary-600 font-semibold">
                          ₹{selectedService ? selectedService.pricing[packageType as keyof typeof selectedService.pricing] : '--'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Additional Information
                  </label>
                  <textarea 
                    name="description" 
                    value={formState.description}
                    onChange={handleInputChange}
                    placeholder="Please provide any additional details about your service request"
                    rows={4}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={handlePrevStep} 
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNextStep} 
                    className="btn btn-primary"
                  >
                    Review & Confirm
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>
                
                <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-neutral-500 text-sm">Service</p>
                      <p className="font-medium">{selectedService?.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-neutral-500 text-sm">Package</p>
                      <p className="font-medium capitalize">{formState.selectedPackage}</p>
                    </div>
                    
                    <div>
                      <p className="text-neutral-500 text-sm">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Date
                      </p>
                      <p className="font-medium">{formState.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-neutral-500 text-sm">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Time
                      </p>
                      <p className="font-medium">{formState.time}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-neutral-500 text-sm">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Service Location
                      </p>
                      <p className="font-medium">
                        {formState.address}, {formState.city}, {formState.postcode}
                      </p>
                    </div>
                    
                    {formState.description && (
                      <div className="md:col-span-2">
                        <p className="text-neutral-500 text-sm">Additional Information</p>
                        <p>{formState.description}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p>{selectedService?.name} ({formState.selectedPackage} package)</p>
                      <p className="font-medium">
                       ₹{selectedService ? selectedService.pricing[formState.selectedPackage as keyof typeof selectedService.pricing] : 0}
                      </p>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <p>Service fee</p>
                      <p>₹5.00</p>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 flex justify-between">
                      <p className="font-semibold">Total</p>
                      <p className="font-bold text-primary-700">
                        ₹{selectedService 
                          ? selectedService.pricing[formState.selectedPackage as keyof typeof selectedService.pricing] + 5 
                          : 5}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <AlertCircle className="h-5 w-5 text-neutral-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-500">
                    By confirming this booking, you agree to our <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and acknowledge our <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={handlePrevStep} 
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;