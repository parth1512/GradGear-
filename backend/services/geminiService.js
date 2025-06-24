const { GoogleGenerativeAI } = require('@google/generative-ai');

let gemini = null;

const initializeGemini = () => {
  if (!gemini) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
};

const getLaptopRecommendations = async (userPreferences) => {
  try {
    const geminiClient = initializeGemini();
    const prompt = createRecommendationPrompt(userPreferences);
    const model = geminiClient.getGenerativeModel({ model: 'models/gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Parse the JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      throw new Error('Invalid response format from Gemini');
    }

    return recommendations;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to get recommendations: ${error.message}`);
  }
};

const createRecommendationPrompt = (preferences) => {
  const {
    useCases,
    budget,
    travelFrequency,
    displayPreferences,
    batteryLife,
    operatingSystem,
    specificFeatures,
    userEmail
  } = preferences;

  return `
Please recommend 3-5 specific laptop models based on these user preferences:

BUDGET: ₹${budget.amount.toLocaleString()} (${budget.currency})

USE CASES: ${useCases.selectedTags.join(', ')}${useCases.otherText ? `, ${useCases.otherText}` : ''}

TRAVEL FREQUENCY: ${travelFrequency}

DISPLAY PREFERENCES: ${displayPreferences.join(', ')}

BATTERY LIFE: ${batteryLife}

OPERATING SYSTEM: ${operatingSystem}

SPECIFIC FEATURES: ${specificFeatures.length > 0 ? specificFeatures.join(', ') : 'None specified'}

USER EMAIL: ${userEmail}

Please return the response in this exact JSON format:
{
  "recommendations": [
    {
      "rank": 1,
      "model": "Exact laptop model name",
      "brand": "Brand name",
      "price": "₹XX,XXX",
      "reasoning": "Brief explanation why this laptop matches their needs",
      "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
      "amazonSearchTerm": "exact model name for amazon search"
    }
  ],
  "summary": "Brief overall recommendation summary"
}

Focus on:
- Laptops available on Amazon India
- Within budget constraints
- Matching the specific use cases
- Considering travel frequency (portability)
- Meeting display and battery requirements
- OS preference compatibility
- Any specific features requested
`;
};

module.exports = {
  getLaptopRecommendations
}; 