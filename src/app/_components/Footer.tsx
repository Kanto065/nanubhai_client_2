import { Mail, Phone, MapPin, Globe, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4">
              <span className="bg-linear-to-r from-primary to-primary-light text-transparent bg-clip-text"></span>
              <span>NanuBhai</span>
            </h3>
            <p className="text-gray-300 mb-4">Your one-stop shop for all your needs. We provide quality products at affordable prices.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300 text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300 text-sm">info@nanubhai.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300 text-sm">123 Main St, City</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm hover:underline">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm hover:underline">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm hover:underline">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">© 2024 NanuBhai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;