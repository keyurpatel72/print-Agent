// routes/jobRoutes.js
const express = require('express');
const PrintJob = require('../models/printJobModel');
const authMiddleware = require('../middlewares/authMiddleware');
const aws = require('../config/aws');
const multer = require('multer');
const router = express.Router();


// Submit a new print job
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { documentUrl } = req.body;
      const printJob = new PrintJob({
         userId: req.userId,
          documentUrl 
        });
      await printJob.save();
      res.status(201).json({
         message: 'Print job submitted', 
         printJob 
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get all jobs for the authenticated user
  router.get('/user', authMiddleware, async (req, res) => {
    try {
      const jobs = await PrintJob.find({ userId: req.userId });
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Submit a new print job with file upload
router.post('/upload', authMiddleware, multer().single('document'), async (req, res) => {
    try {
      const documentUrl = await aws.uploadDocument(req.file);
      const printJob = new PrintJob({ userId: req.userId, documentUrl });
      await printJob.save();
      res.status(201).json({ message: 'Print job submitted', printJob });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;