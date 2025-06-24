const OpenAI = require('openai');

let openai = null;

const initializeOpenAI = () => {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
};

const getLaptopRecommendations = async (userPreferences) => {
  try {
    const openaiClient = initializeOpenAI();
    const prompt = createRecommendationPrompt(userPreferences);
    
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a laptop recommendation expert. Based on user preferences, recommend 3-5 specific laptop models available on Amazon India. 
          
          IMPORTANT: 
          - Return ONLY valid JSON format
          - Include exact laptop model names and brands
          - Focus on laptops available in India
          - Consider budget constraints
          - Match use cases and preferences exactly
          - Include brief reasoning for each recommendation
          - Do not include markdown formatting or code blocks. Respond ONLY with valid JSON. Do not include any extra text, comments, or explanations.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      throw new Error('Invalid response format from OpenAI');
    }

    return recommendations;

  } catch (error) {
    console.error('OpenAI API Error:', error);
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