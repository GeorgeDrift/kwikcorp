
import React from 'react';
import { LayoutGrid, BarChart3, Info, ClipboardCheck, CheckCircle2, UserCircle2, ShoppingCart, Truck } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

const IconMap: Record<string, any> = {
  LayoutGrid,
  BarChart3,
  Info,
  ClipboardCheck,
  ShoppingCart,
  Truck
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-green-600 tracking-widest uppercase mb-3">What We Offer</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Innovative Digital & Logistics Solutions</h3>
          <p className="text-lg text-slate-600">
            From digital marketplaces to specialized agricultural logistics, we cover every step of the farming ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = IconMap[service.icon];
            return (
              <div
                key={service.id}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {Icon && <Icon size={28} />}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Who it's for:
                    </div>
                    <p className="text-slate-900 text-xs font-semibold">{service.whoItsFor}</p>
                  </div>

                  <ul className="space-y-2">
                    {service.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-500">
                        <CheckCircle2 size={14} className="text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
