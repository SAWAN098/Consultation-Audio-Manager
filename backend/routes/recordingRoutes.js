const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording
} = require('../controllers/recordingController');

// Public: view & search recordings
router.get('/', getRecordings);
router.get('/:id', getRecordingById);

// Protected: only logged-in users can upload, update, delete
router.post('/', protect, upload.single('audio'), createRecording);
router.put('/:id', protect, updateRecording);
router.delete('/:id', protect, deleteRecording);

module.exports = router;
