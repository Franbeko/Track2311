const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Application = require('../models/Application');
const Newsletter = require('../models/Newsletter');
const User = require('../models/User');
const Content = require('../models/Content');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// 🔓 PUBLIC ROUTE - OPEN TO ALL SYSTEM GUESTS
// ==========================================

// Get live website text content configurations
router.get('/content', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
      await content.save();
    }
    res.json(content);
  } catch (error) {
    console.error('Error fetching text contents:', error);
    res.status(500).json({ message: 'Server error parsing CMS layer', error: error.message });
  }
});

// ==========================================
// 🔒 SECURE BOUNDARY - ADMIN AUTH REQUIRED BELOW
// ==========================================
router.use(adminAuth);

// Update website content text values
router.put('/content', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content(req.body);
    } else {
      Object.assign(content, req.body);
    }
    await content.save();
    res.json(content);
  } catch (error) {
    console.error('Error saving website contents:', error);
    res.status(500).json({ message: 'Server error saving CMS text changes', error: error.message });
  }
});

// Get all registered system user accounts
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users registry:', error);
    res.status(500).json({ message: 'Server error fetching accounts data', error: error.message });
  }
});

// Delete a user account profile record
router.delete('/users/:id', async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Target user profile entry not found' });
    }

    const adminEmails = ['egsmithjr@track2311investments.org', 'franciskhhaizel@gmail.com'];
    if (adminEmails.includes(userToDelete.email)) {
      return res.status(403).json({ message: 'Master Administrator accounts cannot be deleted' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account permanently purged from registry modules' });
  } catch (error) {
    console.error('Error deleting target account:', error);
    res.status(500).json({ message: 'Server error destroying database entry', error: error.message });
  }
});

// Get compiled dashboard matrix statistics
router.get('/stats', async (req, res) => {
  try {
    const [totalContacts, unreadContacts, totalApplications, totalSubscribers, totalUsers] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Application.countDocuments(),
      Newsletter.countDocuments(),
      User.countDocuments()
    ]);
    
    res.json({
      totalContacts,
      unreadContacts,
      totalApplications,
      totalSubscribers,
      totalUsers
    });
  } catch (error) {
    console.error('Error compiling platform metrics:', error);
    res.status(500).json({ message: 'Server error pulling dashboard statistics', error: error.message });
  }
});

// Get all contact form messages
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark contact message as read
router.put('/contacts/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, status: 'read' },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete contact message entry
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all job submission applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update execution processing status for application
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete job application item
router.delete('/applications/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get newsletter subscribers roster
router.get('/newsletter', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete subscriber record from listing
router.delete('/newsletter/:id', async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;