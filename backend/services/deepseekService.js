const axios = require('axios');

const getLaptopRecommendations = async (userPreferences) => {
  const prompt = createRecommendationPrompt(userPreferences);

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a laptop recommendation expert. Based on user preferences, recommend 3-5 specific laptop models available on Amazon India.\n\nIMPORTANT:\n- Return ONLY valid JSON format\n- Include exact laptop model names and brands\n- Focus on laptops available in India\n- Consider budget constraints\n- Match use cases and preferences exactly\n- Include brief reasoning for each recommendation`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const responseText = response.data.choices[0].message.content;
    let recommendations;
    try {
      recommendations = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse DeepSeek response:', parseError);
      throw new Error('Invalid response format from DeepSeek');
    }
    return recommendations;
  } catch (error) {
    console.error('DeepSeek API Error:', error.response ? error.response.data : error.message);
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