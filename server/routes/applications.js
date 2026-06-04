const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Submit job application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, location, education, coverLetter, linkedin, portfolio, jobTitle, jobLocation } = req.body;
    
    // Save to database
    const application = new Application({
      fullName,
      email,
      phone,
      location,
      education,
      coverLetter,
      linkedin,
      portfolio,
      jobTitle,
      jobLocation
    });
    
    await application.save();
    console.log('Application saved to database:', application._id);
    
    // Send email to company
    const companyEmail = process.env.COMPANY_EMAIL || 'track2311.investments@gmail.com';
    
    await resend.emails.send({
      from: 'Track2311 Careers <onboarding@resend.dev>',
      to: [companyEmail],
      replyTo: email,
      subject: `📝 New Job Application: ${jobTitle} from ${fullName}`,
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
            .badge { display: inline-block; padding: 3px 8px; background: #4CAF50; color: white; border-radius: 20px; font-size: 12px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📝 New Job Application Received</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Position:</div>
                <div class="value"><span class="badge">${jobTitle}</span> - ${jobLocation || 'Not specified'}</div>
              </div>
              
              <div class="field">
                <div class="label">Applicant Name:</div>
                <div class="value">${fullName}</div>
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
                <div class="label">Location:</div>
                <div class="value">${location || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Education:</div>
                <div class="value">${education}</div>
              </div>
              
              <div class="field">
                <div class="label">LinkedIn:</div>
                <div class="value">${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Portfolio:</div>
                <div class="value">${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Cover Letter:</div>
                <div class="value">${coverLetter.replace(/\n/g, '<br>')}</div>
              </div>
              
              <hr>
              
              <div class="field">
                <div class="label">📅 Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
              
              <div class="field">
                <div class="label">📄 Application ID:</div>
                <div class="value">${application._id}</div>
              </div>
            </div>
            <div class="footer">
              <p>Reply directly to this email to contact ${fullName}.</p>
              <p>Track2311 Investment and Consultancy | Liberian Agriculture</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    // Send confirmation email to applicant
    await resend.emails.send({
      from: 'Track2311 Careers <onboarding@resend.dev>',
      to: [email],
      subject: `Application Received: ${jobTitle} at Track2311`,
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
              <h2>✅ Application Received!</h2>
            </div>
            <div class="content">
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Track2311 Investment and Consultancy.</p>
              
              <div class="highlight">
                <p><strong>📋 Application Summary:</strong></p>
                <p><strong>Position:</strong> ${jobTitle}</p>
                <p><strong>Application ID:</strong> ${application._id}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p><strong>⏱️ What to expect:</strong></p>
              <ul>
                <li>Our HR team will review your application within 5-7 business days</li>
                <li>If shortlisted, you will be contacted for an interview</li>
                <li>You will receive updates via email</li>
              </ul>
              
              <p><strong>📞 In the meantime:</strong></p>
              <ul>
                <li>Visit our <a href="https://track2311investments.org/team" style="color: #1B5E20;">Team page</a> to learn more about our agricultural experts</li>
                <li>Follow us on social media for company updates</li>
                <li>Reply to this email if you have any questions</li>
              </ul>
              
              <p>Thank you for your interest in joining our agricultural team!</p>
              
              <p>Best regards,<br>
              <strong>Track2311 HR Team</strong><br>
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
    
    res.status(201).json({ success: true, message: 'Application submitted successfully!' });
    
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
  }
});

// Get all applications (for future admin dashboard)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;