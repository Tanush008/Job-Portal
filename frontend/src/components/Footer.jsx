import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">JobPortal</h3>
            <p className="text-gray-400 text-sm">
              Connecting talented professionals with their dream careers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-facebook text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Find Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Post a Job</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Career Advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Company Reviews</a></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Post Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Browse Candidates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing Plans</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Recruitment Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-envelope mr-2"></i>
                support@jobportal.com
              </p>
              <p className="flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-map-marker-alt mr-2"></i>
                123 Business Street, NY 10001
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 JobPortal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer