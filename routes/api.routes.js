
import { Router } from 'express';
import { ApiController } from '../controllers/api.controller.js';

const router = Router();

// Middleware: Simple Admin Auth
const adminAuth = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password === '1234') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Public Routes
router.get('/content', ApiController.getContent);
router.post('/visit', ApiController.postVisit);
router.post('/visit', ApiController.postVisit);

// Admin Routes - Site Content (Words & Images)
router.put('/admin/mission', adminAuth, ApiController.updateMission);
router.put('/admin/vision', adminAuth, ApiController.updateVision);
router.put('/admin/story', adminAuth, ApiController.updateStory);
router.put('/admin/hero-image', adminAuth, ApiController.updateHeroImage);
router.put('/admin/about-image', adminAuth, ApiController.updateAboutImage);
router.put('/admin/logo', adminAuth, ApiController.updateLogo);
router.put('/admin/section-bg', adminAuth, ApiController.updateSectionBg);

// Admin Routes - Services
router.post('/admin/services', adminAuth, ApiController.addService);
router.put('/admin/services/:id', adminAuth, ApiController.updateService);
router.delete('/admin/services/:id', adminAuth, ApiController.deleteService);

// Admin Routes - Gallery
router.post('/admin/gallery', adminAuth, ApiController.addGalleryItem);
router.delete('/admin/gallery/:id', adminAuth, ApiController.deleteGalleryItem);

// Admin Routes - Stats
router.get('/admin/stats', adminAuth, ApiController.getStats);

export default router;
