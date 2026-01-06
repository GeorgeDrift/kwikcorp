
import React from 'react';
import { Target, Eye, Zap, ShieldCheck, TrendingUp, Leaf, Users } from 'lucide-react';
import { CORE_VALUES } from '../constants';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

const IconMap: Record<string, any> = {
  Zap,
  ShieldCheck,
  TrendingUp,
  Leaf,
  Users
};

const MissionVision: React.FC<MissionVisionProps> = ({ mission, vision }) => {
  return (
    <div className="py-24 overflow-hidden relative">
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="relative p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 text-green-100 opacity-50 group-hover:scale-110 transition-transform">
              <Target size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {mission}
              </p>
            </div>
          </div>

          <div className="relative p-8 md:p-12 bg-slate-900 rounded-3xl shadow-xl border border-slate-800 group hover:shadow-2xl transition-shadow overflow-hidden">
            <div className="absolute -bottom-10 -right-10 p-8 text-white opacity-5 group-hover:scale-110 transition-transform">
              <Eye size={200} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Eye size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                {vision}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-green-600 tracking-widest uppercase mb-3">Foundations</h2>
          <h3 className="text-4xl font-bold text-slate-900">Our Core Values</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CORE_VALUES.map((value) => {
            const Icon = IconMap[value.icon];
            return (
              <div
                key={value.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-slate-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  {Icon && <Icon size={24} />}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
