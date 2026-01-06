
import { SiteContent, Visit, SiteMessage, Service } from '../types';

const API_BASE = 'http://localhost:3001/api';

export const ApiService = {
  async getContent(): Promise<SiteContent | null> {
    try {
      const response = await fetch(`${API_BASE}/content`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      const saved = localStorage.getItem('agrikwik_content_v2');
      return saved ? JSON.parse(saved) : null;
    }
  },

  // Granular Updates
  async updateField(field: 'mission' | 'vision' | 'story', text: string, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/${field}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password || '1234' },
      body: JSON.stringify({ text })
    });
    return res.ok;
  },

  async updateImage(field: 'hero-image' | 'about-image' | 'logo' | 'section-bg', url: string, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/${field}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password || '1234' },
      body: JSON.stringify({ url })
    });
    return res.ok;
  },

  // Service Management
  async addService(service: Service, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password || '1234' },
      body: JSON.stringify(service)
    });
    return res.ok;
  },

  async deleteService(id: string, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/services/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password || '1234' }
    });
    return res.ok;
  },

  // Gallery Management
  async addGalleryItem(url: string, title: string, category: string, description: string, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password || '1234' },
      body: JSON.stringify({ url, title, category, description })
    });
    return res.ok;
  },

  async deleteGalleryItem(id: string, password?: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password || '1234' }
    });
    return res.ok;
  },

  async uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
    return null;
  },

  async logVisit(userAgent: string): Promise<void> {
    try { await fetch(`${API_BASE}/visit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userAgent }) }); }
    catch (error) { }
  },

  async postMessage(text: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
      return response.ok;
    } catch (error) { return false; }
  },

  async getAdminStats(password: string): Promise<{ visits: Visit[], messages: SiteMessage[] } | null> {
    try {
      const response = await fetch(`${API_BASE}/admin/stats`, { headers: { 'x-admin-password': password } });
      return response.ok ? await response.json() : null;
    } catch (error) { return null; }
  }
};
