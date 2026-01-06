
import { DataService } from '../services/data.service.js';

export const ApiController = {
  async getContent(req, res) {
    try {
      const data = await DataService.getSiteContent();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  },

  // Granular Content Handlers
  async updateMission(req, res) {
    try { await DataService.updateMission(req.body.text); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateVision(req, res) {
    try { await DataService.updateVision(req.body.text); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateStory(req, res) {
    try { await DataService.updateStory(req.body.text); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateHeroImage(req, res) {
    try { await DataService.updateHeroImage(req.body.url); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateAboutImage(req, res) {
    try { await DataService.updateAboutImage(req.body.url); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateLogo(req, res) {
    try { await DataService.updateLogoUrl(req.body.url); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateSectionBg(req, res) {
    try { await DataService.updateSectionBg(req.body.url); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  // Service Management Handlers
  async addService(req, res) {
    try { await DataService.addService(req.body); res.status(201).json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async updateService(req, res) {
    try { await DataService.updateService(req.params.id, req.body); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async deleteService(req, res) {
    try { await DataService.deleteService(req.params.id); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  // Gallery Management Handlers
  async addGalleryItem(req, res) {
    try { await DataService.addGalleryItem(req.body.url, req.body.title, req.body.category, req.body.description); res.status(201).json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },
  async deleteGalleryItem(req, res) {
    try { await DataService.deleteGalleryItem(req.params.id); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async postVisit(req, res) {
    try {
      await DataService.logVisit(req.body.userAgent);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },



  async getStats(req, res) {
    try {
      const stats = await DataService.getAdminStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  }
};
