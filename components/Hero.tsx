import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  heroImages: string[];
}

const Hero: React.FC<HeroProps> = ({ heroImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!heroImages || heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const currentHero = heroImages[currentIndex] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Agricultural Innovation ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/60 z-20"></div>
      </div>

      <div className="relative z-30 w-full px-6 md:px-12 lg:px-16 pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Pioneering Agritech in Malawi</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Transforming Agriculture <br />
            <span className="text-green-500">Through Innovation</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 mb-12 leading-relaxed max-w-2xl font-medium">
            Enhancing efficiency and productivity through innovative digital solutions.
            We empower farmers and agribusinesses with data-driven tools for smarter,
            faster, and more sustainable decision-making.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#services"
              className="flex items-center justify-center px-10 py-5 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition-all group shadow-2xl hover:shadow-green-600/40 transform hover:-translate-y-1"
            >
              Our Solutions
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#mission" className="text-white/40 hover:text-white transition-colors p-2 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Scroll</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
