
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  logoUrl: string;
  onLogoClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, logoUrl, onLogoClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo Area - Acts as the hidden entry point */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={onLogoClick}
          >
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center overflow-hidden shadow-lg group-active:scale-95 transition-transform">
              <img src={logoUrl} alt="KwikCorp Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
              KwikCorp
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-green-600 ${isScrolled ? 'text-slate-600' : 'text-slate-200 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-slate-600' : 'text-slate-900 md:text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 border-t border-slate-100 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-bold text-slate-700 hover:text-green-600 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
