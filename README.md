# GRADGEAR - AI-Powered Laptop Recommendation System

GRADGEAR is a comprehensive laptop recommendation platform that uses AI to provide personalized laptop suggestions based on user preferences. The system features a multi-step questionnaire, ChatGPT-powered recommendations, and Amazon affiliate integration.

## 🚀 Features

### Frontend
- **Interactive Multi-Step Questionnaire**: 8-step process collecting user preferences
- **Real-time Validation**: Required field validation with visual indicators
- **Responsive Design**: Modern UI with smooth animations and transitions
- **Custom Notifications**: In-app success/error notifications
- **Results Page**: Beautiful display of AI-generated recommendations

### Backend
- **AI-Powered Recommendations**: ChatGPT integration for intelligent laptop suggestions
- **Amazon Affiliate Integration**: Automatic generation of affiliate links
- **Email Collection**: User email storage for follow-up communications
- **RESTful API**: Clean API endpoints with comprehensive error handling
- **CORS Support**: Secure cross-origin resource sharing

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **CSS3** with custom animations
- **Monument Extended** font family
- **Responsive design** with mobile-first approach

### Backend
- **Node.js** with Express.js
- **OpenAI GPT-4** API integration
- **Amazon Associates** affiliate program
- **CORS** and security middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- Amazon Associates affiliate tag

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GRADGEAR
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Edit .env with your API keys
# OPENAI_API_KEY=your_openai_api_key_here
# AMAZON_AFFILIATE_TAG=your_amazon_affiliate_tag_here

# Start backend server
npm run dev
```

The backend will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Amazon Affiliate Configuration
AMAZON_AFFILIATE_TAG=your_amazon_affiliate_tag_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### API Keys Setup

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

#### Amazon Affiliate Tag
1. Join the [Amazon Associates Program](https://affiliate-program.amazon.in/)
2. Get your affiliate tag from your dashboard
3. Add it to your `.env` file

## 🎯 How It Works

### User Journey
1. **Landing Page**: User sees the main GRADGEAR interface
2. **Questionnaire**: 8-step process collecting preferences:
   - Use cases (Gaming, Work, etc.)
   - Budget range
   - Travel frequency
   - Display preferences
   - Battery life requirements
   - Operating system preference
   - Specific features (optional)
   - Email address
3. **AI Processing**: Backend sends data to ChatGPT for analysis
4. **Recommendations**: AI generates personalized laptop suggestions
5. **Results Page**: User sees recommendations with Amazon affiliate links
6. **Purchase**: User clicks links to purchase on Amazon

### Technical Flow
1. Frontend collects user preferences through the questionnaire
2. Data is sent to backend API endpoint `/api/recommendations`
3. Backend processes data and sends to OpenAI GPT-4
4. ChatGPT analyzes preferences and returns laptop recommendations
5. Backend generates Amazon affiliate links for each recommendation
6. Results are sent back to frontend and displayed on results page

## 📁 Project Structure

```
GRADGEAR/
├── src/
│   ├── components/
│   │   ├── Hero_2.jsx              # Main questionnaire component
│   │   ├── ResultsPage.jsx         # Results display component
│   │   ├── styles/
│   │   │   ├── Hero.css           # Questionnaire styles
│   │   │   └── ResultsPage.css    # Results page styles
│   │   └── ...                    # Other components
│   ├── assets/                    # Images, fonts, icons
│   └── main.jsx                   # App entry point
├── backend/
│   ├── server.js                  # Express server
│   ├── services/
│   │   ├── openaiService.js       # OpenAI integration
│   │   └── amazonService.js       # Amazon affiliate service
│   ├── package.json              # Backend dependencies
│   └── README.md                 # Backend documentation
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Eye-catching visual design
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Professional Typography**: Monument Extended font family
- **Interactive Elements**: Hover states and loading indicators
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔒 Security & Privacy

- **CORS Protection**: Backend only accepts requests from configured frontend URL
- **Environment Variables**: Sensitive data stored in environment files
- **Input Validation**: Frontend and backend validation for all user inputs
- **Error Handling**: Comprehensive error handling without exposing sensitive data
- **Email Privacy**: User emails are collected for recommendations only

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

### Backend Deployment
```bash
# Set NODE_ENV=production in your environment
# Deploy to your preferred hosting service
# (Heroku, AWS EC2, DigitalOcean, etc.)
```

## 📊 Monetization

The platform generates revenue through:
- **Amazon Affiliate Program**: Commission on laptop sales
- **Email Marketing**: Follow-up communications with users
- **Premium Features**: Potential for premium recommendation tiers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the backend README for detailed setup instructions
- Review the console logs for error messages
- Ensure all environment variables are properly configured

## 🔮 Future Enhancements

- **User Accounts**: Save preferences and recommendation history
- **Price Tracking**: Monitor laptop prices and notify users of deals
- **Comparison Tool**: Side-by-side laptop comparison feature
- **Mobile App**: Native mobile application
- **Advanced Analytics**: User behavior and recommendation performance tracking
