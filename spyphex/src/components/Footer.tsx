import { Hexagon, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = ['Models', 'Innovation', 'About Us', 'Find a Retailer'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Warranty'];
  const socialLinks = [
    { name: 'X', icon: Twitter },
    { name: 'Instagram', icon: Instagram },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'YouTube', icon: Youtube }
  ];

  return (
    <footer className="bg-[#0a0c10] border-t border-[#1e2330] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Hexagon className="w-8 h-8 text-[#3b82f6]" />
              <span className="text-xl font-bold tracking-wider font-heading">SYPHEX</span>
            </div>
            <p className="text-gray-400">Engineering the next era of electric performance.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href="#" className="text-gray-400 hover:text-[#3b82f6] transition-colors p-2 hover:bg-[#1e2330] rounded-lg">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#1e2330] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} SYPHEX. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href="#" className="text-gray-400 hover:text-[#3b82f6] transition-colors p-2 hover:bg-[#1e2330] rounded-lg">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;