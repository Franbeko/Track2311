const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.post('/', async (req, res) => {
  try {
    const { name, email, message, timestamp } = req.body;
    const chat = new Chat({ name, email, message, timestamp });
    await chat.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;