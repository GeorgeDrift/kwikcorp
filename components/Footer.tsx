
import React from 'react';

interface FooterProps {
  logoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center overflow-hidden">
              <img src={logoUrl} alt="KwikCorp Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              KwikCorp
            </span>
          </div>

          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} KwikCorp.
          </div>

          <div className="flex space-x-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-green-600">Privacy</a>
            <a href="#" className="hover:text-green-600">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
