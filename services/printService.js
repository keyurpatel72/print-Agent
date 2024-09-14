// services/printerService.js
const PrintJob = require('../models/printJobModel');const simulatePrint = (job) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('completed');  // Simulating printing delay
      }, 5000);
    });
  };
  
// Process a job
exports.processJob = async (jobId) => {
    const job = await PrintJob.findById(jobId);
    if (!job) throw new Error('Job not found');
    
    try {
      const status = await simulatePrint(job);
      job.status = status;
      await job.save();
      console.log(`Job ${jobId} completed`);
    } catch (err) {
      job.status = 'failed';
      await job.save();
    }
  };