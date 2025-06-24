require('dotenv').config();
const { listModels } = require('@google/generative-ai');

async function fetchAvailableModels() {
  try {
    const models = await listModels();
    console.log('Available Models:', models);
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

fetchAvailableModels(); 