const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google profile received:', profile.emails[0].value);
      
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        // Create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isSocialLogin: true,
          password: null
        });
        console.log('New user created:', user.email);
      } else {
        // Update googleId if not present
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
          console.log('Existing user updated with googleId:', user.email);
        } else {
          console.log('Existing user found:', user.email);
        }
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Google Strategy Error:', error);
      return done(error, null);
    }
  }
));

// Initialize passport
router.use(passport.initialize());

// Google Auth Routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/?error=google_auth_failed' }),
  (req, res) => {
    console.log('Google callback successful for user:', req.user.email);
    
    const token = generateToken(req.user._id);
    const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    };
    
    console.log('Redirecting to frontend with token');
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

module.exports = router;