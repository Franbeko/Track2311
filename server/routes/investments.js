const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const authMiddleware = require('../middleware/auth');

// GET all investments - GET /api/investments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.userId })
      .sort({ startDate: -1 });
    res.json({ success: true, investments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CREATE investment - POST /api/investments
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { planName, amount, duration, roi } = req.body;
    
    const investment = new Investment({
      planName,
      amount,
      duration,
      roi,
      investor: req.userId
    });
    
    await investment.save();
    res.status(201).json({ success: true, investment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET statistics - GET /api/investments/stats/summary
router.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.userId });
    
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalReturns = investments.reduce((sum, inv) => sum + inv.returns, 0);
    const activeInvestments = investments.filter(inv => inv.status === 'active').length;
    
    res.json({
      success: true,
      stats: {
        totalInvested,
        totalReturns,
        activeInvestments,
        totalInvestments: investments.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;