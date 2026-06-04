const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { body, validationResult } = require('express-validator');

// SUBSCRIBE TO NEWSLETTER - POST /api/newsletter/subscribe
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    
    let subscription = await Newsletter.findOne({ email });
    if (subscription) {
      if (!subscription.isActive) {
        subscription.isActive = true;
        await subscription.save();
        return res.json({ success: true, message: 'Subscription reactivated' });
      }
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    subscription = new Newsletter({ email });
    await subscription.save();
    
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;