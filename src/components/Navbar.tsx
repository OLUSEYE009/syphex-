import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0c10]/80 backdrop-blur-xl border-b border-[#1e2330]' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hexagon className="w-8 h-8 text-[#3b82f6]" />
            <span className="text-xl font-bold tracking-wider font-heading">SYPHEX</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="relative group">
              <span className="text-sm font-medium">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3b82f6] transition-all group-hover:w-full"></span>
            </a>
            <a href="#models" className="relative group">
              <span className="text-sm font-medium">Models</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3b82f6] transition-all group-hover:w-full"></span>
            </a>
            <a href="#innovation" className="relative group">
              <span className="text-sm font-medium">Innovation</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3b82f6] transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group">
              <span className="text-sm font-medium">Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3b82f6] transition-all group-hover:w-full"></span>
            </a>
            <Link to="/support" className="relative group">
              <span className="text-sm font-medium">Support</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3b82f6] transition-all group-hover:w-full"></span>
            </Link>
          </div>
          <div className="flex gap-2 md:gap-4">
            <Link
              to="/test-drive"
              className="hidden md:inline-block bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-[#3b82f6] hover:text-white transition-colors"
            >
              Book Test Drive
            </Link>
            <Link
              to="/support"
              className="hidden md:inline-block bg-[#3b82f6] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2563eb] transition-colors"
            >
              Support
            </Link>
          </div>
          <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="md:hidden">
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 w-6 bg-white transition-transform ${isMobileNavOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-opacity ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-transform ${isMobileNavOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-[#0a0c10]/95 backdrop-blur-xl z-40 flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            <a href="#home" className="block text-2xl font-bold" onClick={() => setIsMobileNavOpen(false)}>Home</a>
            <a href="#models" className="block text-2xl font-bold" onClick={() => setIsMobileNavOpen(false)}>Models</a>
            <a href="#innovation" className="block text-2xl font-bold" onClick={() => setIsMobileNavOpen(false)}>Innovation</a>
            <a href="#contact" className="block text-2xl font-bold" onClick={() => setIsMobileNavOpen(false)}>Contact</a>
            <Link
              to="/test-drive"
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-[#3b82f6] hover:text-white transition-colors inline-block"
              onClick={() => setIsMobileNavOpen(false)}
            >
              Book Test Drive
            </Link>
            <Link
              to="/support"
              className="bg-[#3b82f6] text-black px-8 py-3 rounded-full font-medium hover:bg-[#2563eb] hover:text-white transition-colors inline-block"
              onClick={() => setIsMobileNavOpen(false)}
            >
              Support
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;