const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// REGISTER - POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    
    // Trim whitespace
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    phone = phone?.trim();
    
    console.log('Registration attempt for:', email);
    
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user - the pre-save hook will hash the password automatically
    const user = new User({
      name,
      email,
      password,
      phone
    });
    
    await user.save();
    console.log('User created successfully:', user._id);
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Send welcome email (optional)
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'https://track2311investments.org';
      await transporter.sendMail({
        from: `"Track2311 Investments" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: '🎉 Welcome to Track2311 Investments!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Welcome to Track2311</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 500px; margin: 0 auto; padding: 20px; }
              .header { background: #1B5E20; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .button { display: inline-block; background: #1B5E20; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Welcome ${name}!</h2>
              </div>
              <div class="content">
                <p>Thank you for joining Track2311 Investments.</p>
                <p>We're excited to have you on board!</p>
                <div style="text-align: center;">
                  <a href="${frontendUrl}/account" class="button">Go to Dashboard</a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      });
      console.log(`Welcome email sent to: ${user.email}`);
    } catch (emailError) {
      console.log('Email skipped:', emailError.message);
    }
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// LOGIN - POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    
    // Trim whitespace from email and password
    email = email?.trim().toLowerCase();
    password = password?.trim();
    
    console.log('Login attempt for:', email);
    console.log('Password length:', password?.length);
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if user has a password (not social login)
    if (!user.password) {
      console.log('User has no password (social login)');
      return res.status(401).json({ message: 'Please sign in with Google' });
    }
    
    // Use the model's comparePassword method
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Login successful for:', email);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;