
import React from 'react';
import { Maximize2, Camera, Plus } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = React.useState<GalleryItem | null>(null);

  return (
    <div className="py-24">
      {/* Story Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            <div className="md:w-3/5 h-[40vh] md:h-auto relative">
              <img src={selectedItem.url} className="w-full h-full object-cover" alt={selectedItem.title} />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto bg-slate-50 flex flex-col">
              <div className="mb-8">
                <span className="text-green-600 font-bold uppercase tracking-widest text-xs mb-3 block">{selectedItem.category}</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{selectedItem.title}</h2>
              </div>
              <div className="prose prose-slate prose-lg">
                <p className="text-slate-600 leading-relaxed font-medium">
                  {selectedItem.description || "The story for this impact moment is being prepared. Stay tuned for updates on KwikCorp's journey in transforming African agriculture."}
                </p>
              </div>
              <div className="mt-auto pt-8 border-t border-slate-200">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-base font-bold text-green-600 tracking-widest uppercase mb-3">Visual Impact</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Our Work in Focus</h3>
            <p className="text-lg text-slate-600">
              Capturing the essence of digital transformation in Malawi's agricultural landscape.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center space-x-2 text-green-600 font-bold border-b-2 border-green-600 pb-1 cursor-pointer hover:text-green-700 hover:border-green-700 transition-colors">
              <Camera size={20} />
              <span>Gallery</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.length > 0 ? items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative overflow-hidden rounded-[2rem] group cursor-pointer border border-slate-100 shadow-sm bg-slate-100 aspect-square"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h4 className="text-white text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h4>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                  <Maximize2 className="text-white/70" size={24} />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-medium">Gallery is loading or empty...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
