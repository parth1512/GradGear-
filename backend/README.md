# GRADGEAR Backend

This is the backend server for the GRADGEAR laptop recommendation system. It integrates with OpenAI's ChatGPT API to generate personalized laptop recommendations and creates Amazon affiliate links.

## Features

- 🤖 AI-powered laptop recommendations using ChatGPT
- 🛒 Amazon affiliate link generation
- 📧 Email collection for user recommendations
- 🔒 Secure API endpoints with CORS support
- 📊 Comprehensive user preference analysis

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

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

### 3. Required API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

#### Amazon Affiliate Tag
1. Join the [Amazon Associates Program](https://affiliate-program.amazon.in/)
2. Get your affiliate tag from your dashboard
3. Add it to your `.env` file

### 4. Start the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and basic information.

### Get Recommendations
```
POST /api/recommendations
```

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "useCases": {
    "selectedTags": ["Gaming", "Video Editing"],
    "otherText": "Additional use cases"
  },
  "budget": {
    "amount": 75000,
    "currency": "INR"
  },
  "travelFrequency": "Frequently",
  "displayPreferences": ["15.6 inch", "High Resolution"],
  "batteryLife": "8+ hours",
  "operatingSystem": "Windows",
  "specificFeatures": ["Backlit Keyboard", "Touch Screen"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": {
    "recommendations": [
      {
        "rank": 1,
        "model": "ASUS ROG Strix G15",
        "brand": "ASUS",
        "price": "₹75,000",
        "reasoning": "Perfect for gaming and video editing with powerful GPU",
        "keyFeatures": ["RTX 3060", "16GB RAM", "512GB SSD"],
        "amazonSearchTerm": "ASUS ROG Strix G15",
        "amazonLink": "https://www.amazon.in/s?k=ASUS+ROG+Strix+G15&tag=your-affiliate-tag",
        "directLink": "https://www.amazon.in/dp/B0XXXXXXX?tag=your-affiliate-tag"
      }
    ],
    "summary": "Based on your gaming and video editing needs..."
  },
  "userEmail": "user@example.com"
}
```

## Project Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
├── README.md             # This file
└── services/
    ├── openaiService.js   # OpenAI API integration
    └── amazonService.js   # Amazon affiliate link generation
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid user preferences
- OpenAI API errors
- Network connectivity issues
- Invalid JSON responses

## Security Considerations

- CORS is configured to only allow requests from the frontend URL
- Environment variables are used for sensitive data
- Input validation is implemented
- Error messages don't expose sensitive information

## Development Notes

- The server uses nodemon for development hot-reloading
- All API responses are logged for debugging
- The OpenAI integration uses GPT-4 for best recommendations
- Amazon links are generated with affiliate tags for monetization

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in `.env` matches your frontend URL
2. **OpenAI API Errors**: Verify your API key is valid and has sufficient credits
3. **Port Already in Use**: Change the `PORT` in `.env` or kill the process using the port

### Logs

Check the console output for detailed error messages and API request logs. 