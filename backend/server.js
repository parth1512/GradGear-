const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { getLaptopRecommendations } = require('./services/openaiService');
const { generateAmazonLinks } = require('./services/amazonService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// CORS configuration to allow multiple frontend ports
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', 
  'http://localhost:5175',
  'http://localhost:3000',
  'https://gradgear-1-frontend.onrender.com'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'GRADGEAR Backend is running' });
});

// Main recommendation endpoint
app.post('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await getLaptopRecommendations(req.body);
    // Add Amazon affiliate links
    const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || 'your-affiliate-tag';
    if (recommendations && recommendations.recommendations) {
      recommendations.recommendations = recommendations.recommendations.map(laptop => ({
        ...laptop,
        amazonLink: `https://www.amazon.in/s?k=${encodeURIComponent(laptop.amazonSearchTerm || laptop.model)}&tag=${affiliateTag}`
      }));
    }
    res.json({
      success: true,
      recommendations,
      userEmail: req.body.userEmail
    });
  } catch (error) {
    console.error('Error in /api/recommendations:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get recommendations'
    });
  }
});

// Send email recommendations endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { userEmail, recommendations } = req.body;
    
    if (!userEmail || !recommendations) {
      return res.status(400).json({ 
        error: 'User email and recommendations are required' 
      });
    }

    console.log('Sending email to:', userEmail);

    // Create email content
    const emailSubject = "Your Personalized Laptop Recommendations from GRADGEAR";
    
    let emailBody = `Hi there!\n\n`;
    emailBody += `Thank you for using GRADGEAR! Here are your personalized laptop recommendations:\n\n`;
    
    if (recommendations.summary) {
      emailBody += `Summary: ${recommendations.summary}\n\n`;
    }
    
    emailBody += `Your Recommendations:\n\n`;
    
    recommendations.recommendations.forEach((laptop, index) => {
      emailBody += `${index + 1}. ${laptop.model} (${laptop.brand})\n`;
      emailBody += `   Price: ${laptop.price}\n`;
      emailBody += `   Why this laptop: ${laptop.reasoning}\n`;
      emailBody += `   Key Features:\n`;
      laptop.keyFeatures.forEach(feature => {
        emailBody += `   • ${feature}\n`;
      });
      emailBody += `   View on Amazon: ${laptop.amazonLink}\n\n`;
    });
    
    emailBody += `Best regards,\nThe GRADGEAR Team\n\n`;
    emailBody += `P.S. Don't forget to compare prices and read reviews before making your final decision!`;

    // Send email using Nodemailer
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject: emailSubject,
      text: emailBody
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.json({
      success: true,
      message: 'Recommendations sent to your email successfully!',
      emailSent: true,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GRADGEAR Backend running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Recommendations: http://localhost:${PORT}/api/recommendations`);
  console.log(`📬 Send Email: http://localhost:${PORT}/api/send-email`);
  console.log(`📧 Email configured from: ${process.env.GMAIL_USER}`);
}); 