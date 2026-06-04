const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    const { name, email, password, phone } = req.body;
    
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
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });
    
    await user.save();
    console.log('User created successfully:', user._id);
    
    // Send Welcome Email
    const welcomeMailOptions = {
      from: `"Track2311 Investments" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: '🎉 Welcome to Track2311 Investments!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Track2311</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1B5E20 0%, #B71C1C 100%); padding: 30px 20px; text-align: center; }
            .header h1 { color: #F9A825; margin: 0; font-size: 28px; }
            .header p { color: #fff; margin: 10px 0 0; opacity: 0.9; }
            .content { background: white; padding: 30px; }
            .button { display: inline-block; background: #1B5E20; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .info-box { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Track2311 Investments</h1>
              <p>Building wealth through smart investments</p>
            </div>
            <div class="content">
              <h2 style="color: #1B5E20;">Welcome ${name}! 🎉</h2>
              <p>Thank you for joining Track2311 Investments. We're excited to have you on board!</p>
              
              <div class="info-box">
                <h3 style="color: #1B5E20; margin-top: 0;">Your Account Details:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Account Created:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              <h3>🚀 Next Steps:</h3>
              <ul>
                <li>📊 Explore our investment plans</li>
                <li>💰 Make your first deposit</li>
                <li>📈 Start earning returns</li>
                <li>🎯 Track your portfolio in real-time</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">Go to Dashboard</a>
              </div>
              
              <p>If you have any questions, our support team is here to help:</p>
              <p>📧 ${process.env.EMAIL_USER}<br>📞 +1 (901) 608-0131</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Track2311 Investment and Consultancy. All rights reserved.</p>
              <p>Monrovia, Liberia | +1 (901) 608-0131</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Track2311 Investments, ${name}!

Thank you for joining us. Your account has been successfully created.

Account Details:
- Name: ${name}
- Email: ${email}
- Account Created: ${new Date().toLocaleDateString()}

Next Steps:
1. Explore our investment plans
2. Make your first deposit
3. Start earning returns
4. Track your portfolio in real-time

Visit your dashboard: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard

Need help? Contact us:
Email: ${process.env.EMAIL_USER}
Phone: +1 (901) 608-0131

---
Track2311 Investment and Consultancy
Building wealth through smart investments
      `
    };
    
    await transporter.sendMail(welcomeMailOptions);
    console.log(`✅ Welcome email sent to: ${user.email}`);
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
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
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
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