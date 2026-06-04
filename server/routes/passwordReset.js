const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Request password reset - POST /api/password-reset/request
router.post('/request', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }
    
    const user = await User.findOne({ email });
    
    // For security, always return success even if user not found
    if (!user) {
      return res.status(200).json({ 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();
    
    // Get frontend URL from environment or use default
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
    
    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Track2311 <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Reset Your Track2311 Password',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 500px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #1B5E20; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
              .warning { background: #FFF3E0; padding: 15px; border-radius: 8px; border-left: 3px solid #FFC107; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🔐 Reset Your Password</h2>
              </div>
              <div class="content">
                <p>Hello <strong>${user.name}</strong>,</p>
                
                <p>We received a request to reset the password for your Track2311 account.</p>
                
                <div style="text-align: center;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </div>
                
                <div class="warning">
                  <p><strong>⚠️ This link will expire in 1 hour</strong></p>
                  <p style="margin-bottom: 0;">If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="background: #eee; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 12px;">${resetUrl}</p>
                
                <hr>
                
                <p><strong>🔒 Security Tips:</strong></p>
                <ul>
                  <li>Never share this link with anyone</li>
                  <li>Make sure your new password is strong and unique</li>
                  <li>Contact support if you didn't request this reset</li>
                </ul>
              </div>
              <div class="footer">
                <p>Track2311 Investment and Consultancy | Monrovia, Liberia</p>
                <p>© ${new Date().getFullYear()} Track2311. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      });
      
      console.log(`✅ Password reset email sent to: ${user.email}`);
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, but log it
    }
    
    res.status(200).json({ 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Verify reset token
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }
    
    res.status(200).json({ message: 'Token is valid', email: user.email });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset', async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }
    
    // Update password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    console.log(`✅ Password reset successful for: ${user.email}`);
    
    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'Track2311 <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Your Track2311 Password Has Been Changed',
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
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>✅ Password Changed Successfully</h2>
              </div>
              <div class="content">
                <p>Hello <strong>${user.name}</strong>,</p>
                <p>Your Track2311 account password has been successfully changed.</p>
                <p>If you did not make this change, please contact our support team immediately.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="background: #1B5E20; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
                </div>
                <hr>
                <p style="font-size: 12px; color: #666;">This is a security notification. No further action is required.</p>
              </div>
              <div class="footer">
                <p>Track2311 Investment and Consultancy</p>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
    }
    
    res.status(200).json({ message: 'Password has been reset successfully!' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;