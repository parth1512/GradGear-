const generateAmazonLinks = async (recommendations) => {
  try {
    const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || 'your-affiliate-tag';
    
    if (!recommendations || !recommendations.recommendations) {
      throw new Error('Invalid recommendations format');
    }

    const recommendationsWithLinks = recommendations.recommendations.map(laptop => {
      // Create Amazon India search URL with affiliate tag
      const searchTerm = encodeURIComponent(laptop.amazonSearchTerm || laptop.model);
      const amazonUrl = `https://www.amazon.in/s?k=${searchTerm}&tag=${affiliateTag}`;
      
      return {
        ...laptop,
        amazonLink: amazonUrl,
        directLink: `https://www.amazon.in/dp/${generateProductId(laptop.model)}?tag=${affiliateTag}`
      };
    });

    return {
      ...recommendations,
      recommendations: recommendationsWithLinks
    };

  } catch (error) {
    console.error('Error generating Amazon links:', error);
    throw new Error(`Failed to generate Amazon links: ${error.message}`);
  }
};

// Helper function to generate a mock product ID (in real implementation, you'd use Amazon's Product Advertising API)
const generateProductId = (modelName) => {
  // This is a placeholder - in production, you'd use Amazon's API to get actual product IDs
  const cleanModel = modelName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `B0${cleanModel.slice(0, 8).padEnd(8, '0')}`;
};

// Alternative: Use Amazon's Product Advertising API for more accurate results
const searchAmazonProducts = async (searchTerm) => {
  // This would integrate with Amazon's Product Advertising API
  // For now, we'll use the search URL approach
  const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || 'your-affiliate-tag';
  const encodedTerm = encodeURIComponent(searchTerm);
  
  return {
    searchUrl: `https://www.amazon.in/s?k=${encodedTerm}&tag=${affiliateTag}`,
    categoryUrl: `https://www.amazon.in/s?i=computers&bbn=1375424031&rh=n%3A1375424031%2Cn%3A1389401031&k=${encodedTerm}&tag=${affiliateTag}`
  };
};

module.exports = {
  generateAmazonLinks,
  searchAmazonProducts
}; 