import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Wrench className="h-7 w-7 text-primary-400" />
              <span className="font-bold text-xl text-white">Smart Labour</span>
            </Link>
            <p className="text-neutral-300 mb-4">
              Your one-stop solution for all labour services. Quality work, professional staff, and
              competitive pricing.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-neutral-300 hover:text-white transition-colors">
                  Book a Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Plumbing & Heating
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Carpentry & Woodwork
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Cleaning Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary-400 h-5 w-5 mt-0.5" />
                <span className="text-neutral-300">
                  Warangal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary-400 h-5 w-5" />
                <a href="tel:+441234567890" className="text-neutral-300 hover:text-white transition-colors">
                   +9123456789
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary-400 h-5 w-5" />
                <a href="mailto:info@smartlabour.com" className="text-neutral-300 hover:text-white transition-colors">
                  info@smartlabour.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-neutral-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Smart Labour Services. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;