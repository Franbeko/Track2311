const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Configure email transporter using either GMAIL or EMAIL config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.GMAIL_USER,
    pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD
  }
});

// SUBMIT CONTACT FORM - POST /api/contact
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;
    
    // Save to database
    const contact = new Contact({ 
      name, 
      email, 
      phone, 
      message
    });
    await contact.save();
    
    const fromEmail = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const companyEmail = process.env.COMPANY_EMAIL || 'track2311.investments@gmail.com';
    
    // Send email to company
    await transporter.sendMail({
      from: `"Track2311 Website" <${fromEmail}>`,
      to: companyEmail,
      replyTo: email,
      subject: `🌾 New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1B5E20; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #FFC107; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🌾 Track2311 - New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <hr>
              
              <div class="field">
                <div class="label">📅 Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>Reply directly to this email to respond to ${name}.</p>
              <p>Track2311 Investment and Consultancy | Liberian Agriculture</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    // Send auto-reply to the user
    await transporter.sendMail({
      from: `"Track2311 Team" <${fromEmail}>`,
      to: email,
      subject: 'Thank you for contacting Track2311',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .highlight { background: #FFF3E0; padding: 15px; border-radius: 8px; border-left: 3px solid #FFC107; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🌾 Thank You for Contacting Track2311!</h2>
            </div>
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>Thank you for reaching out to Track2311 Investment and Consultancy. We have received your inquiry and our agricultural team will review it shortly.</p>
              
              <div class="highlight">
                <p><strong>📋 Your Message Summary:</strong></p>
                <p>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
              </div>
              
              <p><strong>⏱️ What to expect:</strong></p>
              <ul>
                <li>Response within 24-48 hours</li>
                <li>Our team will contact you via email or phone</li>
              </ul>
              
              <p><strong>📞 In the meantime, you can:</strong></p>
              <ul>
                <li>Call our farmer hotline: <strong>+1 (901) 608-0131</strong></li>
                <li>Chat with our AI assistant on our website</li>
                <li>Reply to this email with any additional information</li>
              </ul>
              
              <p>Best regards,<br>
              <strong>Track2311 Agricultural Team</strong><br>
              <em>Empowering Liberian Farmers, Connecting Global Markets</em></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Track2311 Investment and Consultancy | Monrovia, Liberia</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    res.status(201).json({ success: true, message: 'Message sent successfully' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// GET all contact messages (admin only - optional)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact status (admin only - optional)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;