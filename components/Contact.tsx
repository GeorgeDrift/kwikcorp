
import React, { useState } from 'react';
import { Mail, MapPin, Send, Facebook, Linkedin } from 'lucide-react';
import { ApiService } from '../services/api';

interface ContactProps {
  bgImage: string;
}

const Contact: React.FC<ContactProps> = ({ bgImage }) => {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await ApiService.postMessage(message);

    if (success) {
      setIsSent(true);
      setMessage('');
    }
    setIsSubmitting(false);

    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="py-24">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">

          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src={bgImage} className="w-full h-full object-cover" alt="" />
          </div>

          {/* Info Side - Now expanded */}
          <div className="w-full bg-green-600 p-10 md:p-16 text-white relative z-10">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-8">Get in Touch</h3>
              <p className="text-green-100 mb-16 text-xl leading-relaxed max-w-2xl">
                We're here to help you revolutionize your agricultural projects. Reach out directly via WhatsApp for the fastest response, or use the contact details below.
              </p>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Mail size={32} />
                    </div>
                    <div>
                      <p className="text-sm text-green-200 uppercase tracking-widest font-black mb-1">Direct Line</p>
                      <p className="text-2xl font-bold">support@kwikcorp.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <p className="text-sm text-green-200 uppercase tracking-widest font-black mb-1">Our Base</p>
                      <p className="text-2xl font-bold">Lilongwe, Malawi</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end space-y-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                    <p className="text-green-200 text-sm font-bold uppercase tracking-widest mb-4">Direct Communication</p>
                    <p className="text-white text-lg font-medium mb-6">Need immediate support? Tap below to chat with us on WhatsApp.</p>
                    <a
                      href="https://wa.me/265999000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 bg-white text-green-600 px-8 py-4 rounded-2xl font-black hover:bg-green-50 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex space-x-6 justify-center md:justify-start">
                    <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 transition-all rounded-2xl flex items-center justify-center border border-white/10 group">
                      <Facebook size={28} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 transition-all rounded-2xl flex items-center justify-center border border-white/10 group">
                      <Linkedin size={28} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
