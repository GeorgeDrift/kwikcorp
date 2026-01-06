
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Edit3, LogOut, Save, Trash2, CheckCircle, Plus, Image as ImageIcon, Lock, ShieldCheck, Globe, Image as IconImage, Type, Upload, Loader2, MessageSquare } from 'lucide-react';
import { SiteContent, Visit, SiteMessage, Service, GalleryItem } from '../types';
import { ApiService } from '../services/api';

interface AdminDashboardProps {
  onExit: () => void;
  content: SiteContent;
  onUpdate: (content: SiteContent, password?: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit, content, onUpdate }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('1234');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'stats' | 'content' | 'services' | 'gallery'>('stats');
  const [stats, setStats] = useState<{ visits: Visit[] }>({ visits: [] });
  const [editableContent, setEditableContent] = useState<SiteContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  // Modal States
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({ title: '', shortDescription: '', whoItsFor: '', keyBenefits: [], icon: 'Zap' });
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: '', url: '', description: '' });

  useEffect(() => {
    if (isAuthorized) {
      fetchStats();
    }
  }, [isAuthorized]);

  const fetchStats = async () => {
    const data = await ApiService.getAdminStats(password);
    if (data) setStats(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthorized(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const updateField = async (field: 'mission' | 'vision' | 'story', text: string) => {
    const success = await ApiService.updateField(field, text, password);
    if (success) {
      setEditableContent(prev => ({ ...prev, [field]: text }));
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2000);
    }
  };

  const updateImage = async (field: 'hero-image' | 'about-image' | 'logo' | 'section-bg', url: string) => {
    const success = await ApiService.updateImage(field, url, password);
    if (success) {
      const map: Record<string, string> = {
        'hero-image': 'hero',
        'about-image': 'about',
        'logo': 'logo',
        'section-bg': 'sectionBg'
      };
      setEditableContent(prev => ({
        ...prev,
        images: { ...prev.images, [map[field]]: url }
      }));
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'asset' | 'gallery', assetKey?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = assetKey || 'gallery';
    setIsUploading(key);

    try {
      const url = await ApiService.uploadFile(file);
      if (url) {
        if (type === 'asset' && assetKey) {
          setEditableContent({
            ...editableContent,
            images: { ...editableContent.images, [assetKey]: url }
          });
          await ApiService.updateImage(assetKey as any, url);
          setShowSavedToast(true);
          setTimeout(() => setShowSavedToast(false), 3000);
        } else if (type === 'gallery') {
          setNewGalleryItem({ ...newGalleryItem, url });
        }
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(null);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (await ApiService.deleteGalleryItem(id, password)) {
      setEditableContent(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!newService.title || !newService.shortDescription) return;

    // transform benefits string to array if needed, for now assume user enters comma separated? 
    // Actually the UI inputs will handle this. Let's make it simple.
    const servicePayload = {
      ...newService,
      keyBenefits: Array.isArray(newService.keyBenefits) ? newService.keyBenefits : (newService.keyBenefits as string || '').split(',').map(s => s.trim())
    } as Service;

    const success = await ApiService.addService(servicePayload, password);
    if (success) {
      const fresh = await ApiService.getContent();
      if (fresh) setEditableContent(fresh);
      setShowServiceModal(false);
      setNewService({ title: '', shortDescription: '', whoItsFor: '', keyBenefits: [], icon: 'Zap' });
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.url) return;
    const success = await ApiService.addGalleryItem(newGalleryItem.url, newGalleryItem.title, newGalleryItem.category, newGalleryItem.description, password);
    if (success) {
      const fresh = await ApiService.getContent();
      if (fresh) setEditableContent(fresh);
      setShowGalleryModal(false);
      setNewGalleryItem({ title: '', category: '', url: '', description: '' });
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-inter">
        <div className="max-w-md w-full bg-slate-800 rounded-[2.5rem] p-10 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <ShieldCheck size={64} className="mx-auto text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-white">KwikCorp</h1>
            <p className="text-slate-400 mt-2">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full bg-slate-900 border ${loginError ? 'border-red-500' : 'border-slate-700'} rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-green-500 transition-colors`}
                placeholder="Secure Access Password"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-bold text-center">Invalid access credentials</p>}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/20 transition-all active:scale-95">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-inter">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-800 fixed inset-y-0 border-r border-slate-700 z-50">
        <div className="p-8 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center overflow-hidden">
              <img src={editableContent.images.logo} className="w-full h-full object-cover" alt="Logo" />
            </div>
            <span className="font-bold text-xl tracking-tight">KwikCorp</span>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'stats' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
            <LayoutDashboard size={20} />
            <span className="font-bold">Analytics</span>
          </button>

          <div className="pt-4 pb-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 px-5">Management</div>
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'content' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
            <Type size={20} />
            <span className="font-bold">Site Content</span>
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'services' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
            <Globe size={20} />
            <span className="font-bold">Services</span>
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all ${activeTab === 'gallery' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
            <IconImage size={20} />
            <span className="font-bold">Gallery</span>
          </button>
        </nav>

        <button onClick={onExit} className="absolute bottom-8 left-6 right-6 flex items-center justify-center space-x-2 py-4 bg-red-600/10 text-red-500 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all">
          <LogOut size={18} />
          <span>Exit Dashboard</span>
        </button>
      </aside>

      {/* Main Area */}
      <main className="ml-72 flex-grow p-12 min-h-screen">
        {showSavedToast && (
          <div className="fixed top-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-top-4 flex items-center space-x-3">
            <CheckCircle size={20} />
            <span className="font-bold">Record Updated Successfully!</span>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black">Platform Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Visits</p>
                <p className="text-4xl font-black text-green-500">{stats.visits.length}</p>
              </div>

            </div>

            <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-lg">Recent Visitors</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-bold">
                    <tr><th className="p-6">Device / Agent</th><th className="p-6">Timestamp</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {stats.visits.map((v, i) => (
                      <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-6 text-sm font-medium text-slate-300 truncate max-w-lg">{v.userAgent}</td>
                        <td className="p-6 text-sm text-slate-500">{new Date(v.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'content' && (
          <div className="max-w-4xl space-y-12 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black">Core Records</h1>

            {/* Mission Section */}
            <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <Type className="text-green-500" size={24} />
                  <span>Corporate Mission</span>
                </h2>
                <button onClick={() => updateField('mission', editableContent.mission)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95 text-sm">Update Mission</button>
              </div>
              <textarea
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:border-green-500 transition-colors resize-none"
                rows={4}
                value={editableContent.mission}
                onChange={e => setEditableContent({ ...editableContent, mission: e.target.value })}
              />
            </div>

            {/* Vision Section */}
            <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <Globe className="text-blue-500" size={24} />
                  <span>Corporate Vision</span>
                </h2>
                <button onClick={() => updateField('vision', editableContent.vision)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95 text-sm">Update Vision</button>
              </div>
              <textarea
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:border-green-500 transition-colors resize-none"
                rows={4}
                value={editableContent.vision}
                onChange={e => setEditableContent({ ...editableContent, vision: e.target.value })}
              />
            </div>

            {/* Assets (Logos & Images) */}
            <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 space-y-8">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <IconImage className="text-yellow-500" size={24} />
                <span>Brand Assets & Images</span>
              </h2>

              <div className="grid gap-6">
                {[
                  { label: 'Company Logo', field: 'logo', key: 'logo' as const, api: 'logo' as const },
                  { label: 'Hero Image', field: 'hero', key: 'hero' as const, api: 'hero-image' as const },
                  { label: 'About Us Image', field: 'about', key: 'about' as const, api: 'about-image' as const },
                  { label: 'Section Background', field: 'sectionBg', key: 'sectionBg' as const, api: 'section-bg' as const }
                ].map((asset) => (
                  <div key={asset.field} className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{asset.label}</label>
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-grow">
                        <input
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium pr-12"
                          value={editableContent.images[asset.key]}
                          onChange={e => setEditableContent({ ...editableContent, images: { ...editableContent.images, [asset.key]: e.target.value } })}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <label className="cursor-pointer p-2 hover:bg-slate-700 rounded-lg transition-colors block">
                            {isUploading === asset.key ? (
                              <Loader2 size={18} className="animate-spin text-green-500" />
                            ) : (
                              <Upload size={18} className="text-slate-400" />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'asset', asset.key)}
                            />
                          </label>
                        </div>
                      </div>
                      <button onClick={() => updateImage(asset.api, editableContent.images[asset.key])} className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl font-bold transition-all text-sm">Apply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-black">Services Management</h1>
              <button onClick={() => setShowServiceModal(true)} className="bg-green-600 px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-green-700 transition-all active:scale-95">
                <Plus size={20} />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Add Service Modal */}
            {showServiceModal && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl animate-in zoom-in-50">
                  <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Service Title" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} required />
                    <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Short Description" value={newService.shortDescription} onChange={e => setNewService({ ...newService, shortDescription: e.target.value })} required rows={3} />
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Who is this for?" value={newService.whoItsFor} onChange={e => setNewService({ ...newService, whoItsFor: e.target.value })} />
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Key Benefits (comma separated)" value={newService.keyBenefits as any} onChange={e => setNewService({ ...newService, keyBenefits: e.target.value as any })} />
                    <div className="flex justify-end space-x-3 pt-4">
                      <button type="button" onClick={() => setShowServiceModal(false)} className="px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">Cancel</button>
                      <button type="submit" className="bg-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-700 text-white">Save Service</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {editableContent.services.map((s, idx) => (
                <div key={s.id} className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 relative group overflow-hidden">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button onClick={async () => {
                      if (confirm('Delete this service?')) {
                        const ok = await ApiService.deleteService(s.id, password);
                        if (ok) setEditableContent(p => ({ ...p, services: p.services.filter(item => item.id !== s.id) }));
                      }
                    }} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h4 className="text-xl font-bold mb-4">{s.title}</h4>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{s.shortDescription}</p>
                  <div className="flex items-center text-xs font-bold text-green-500">
                    <Globe size={14} className="mr-2" />
                    <span>Live on Platform</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-black">Portfolio Gallery</h1>
              <button onClick={() => setShowGalleryModal(true)} className="bg-green-600 px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-green-700 transition-all active:scale-95">
                <Plus size={20} />
                <span>Upload Image</span>
              </button>
            </div>

            {/* Add Gallery Modal */}
            {showGalleryModal && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl animate-in zoom-in-50">
                  <h2 className="text-2xl font-bold mb-6">Add Gallery Item</h2>
                  <form onSubmit={handleAddGallery} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image Source (URL or Upload)</label>
                      <div className="flex space-x-3">
                        <input
                          className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm"
                          placeholder="https://images.unsplash.com/..."
                          value={newGalleryItem.url}
                          onChange={e => setNewGalleryItem({ ...newGalleryItem, url: e.target.value })}
                        />
                        <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold transition-all text-sm flex items-center space-x-2">
                          {isUploading === 'gallery' ? (
                            <Loader2 size={18} className="animate-spin text-green-500" />
                          ) : (
                            <Upload size={18} />
                          )}
                          <span>{isUploading === 'gallery' ? 'Uploading...' : 'Upload'}</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'gallery')}
                          />
                        </label>
                      </div>
                    </div>
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Title" value={newGalleryItem.title} onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })} required />
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Category" value={newGalleryItem.category} onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })} />
                    <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4" placeholder="Story / Description" value={newGalleryItem.description} onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })} rows={3} />
                    <div className="flex justify-end space-x-3 pt-4">
                      <button type="button" onClick={() => setShowGalleryModal(false)} className="px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">Cancel</button>
                      <button type="submit" className="bg-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-700 text-white">Add Image</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {editableContent.gallery.map((item) => (
                <div key={item.id} className="group relative aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                  <img src={item.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.title} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60 p-4 text-center">
                    <div className="space-y-3">
                      <p className="font-bold text-sm">{item.title}</p>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="bg-red-600 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
