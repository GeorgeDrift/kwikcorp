
import React from 'react';
import { Quote } from 'lucide-react';

interface StoryProps {
  storyText: string;
  aboutImage: string;
}

const Story: React.FC<StoryProps> = ({ storyText, aboutImage }) => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="AgriKwik Impact"
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

            <div className="absolute -bottom-8 left-8 right-8 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100">
              <div className="bg-green-600 p-3 rounded-full text-white">
                <Quote size={20} />
              </div>
              <div>
                <p className="text-sm italic text-slate-600">"Bridging the gap between traditional practices and modern digital solutions."</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-base font-bold text-green-600 tracking-widest uppercase mb-3">Our Story</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Data-Driven Evolution <br /> in Agriculture</h3>

            <div className="space-y-6 text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
              {storyText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
