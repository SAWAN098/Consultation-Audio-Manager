const fs = require('fs');
const path = require('path');
const Recording = require('../models/Recording');

exports.createRecording = async (req, res) => {
  try {
    const { title, clientName, notes, status } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Audio file is required' });

    const fileUrl = `/uploads/${req.file.filename}`;

    const recording = await Recording.create({
      title,
      clientName,
      fileUrl,
      notes,
      status
    });

    res.status(201).json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecordings = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { clientName: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const recordings = await Recording.find(filter).sort({ createdAt: -1 });
    res.json(recordings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecordingById = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) return res.status(404).json({ message: 'Recording not found' });
    res.json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecording = async (req, res) => {
  try {
    const { notes, status, title, clientName } = req.body;

    const recording = await Recording.findById(req.params.id);
    if (!recording) return res.status(404).json({ message: 'Recording not found' });

    if (notes !== undefined) recording.notes = notes;
    if (status !== undefined) recording.status = status;
    if (title !== undefined) recording.title = title;
    if (clientName !== undefined) recording.clientName = clientName;

    await recording.save();
    res.json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) return res.status(404).json({ message: 'Recording not found' });

    const filePath = path.join(__dirname, '..', recording.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await recording.deleteOne();
    res.json({ message: 'Recording deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
