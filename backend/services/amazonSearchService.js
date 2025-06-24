const axios = require('axios');
const aws4 = require('aws4');

const config = {
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  partnerTag: process.env.AMAZON_ASSOCIATE_TAG,
  marketplace: 'www.amazon.in',
  region: 'eu-west-1',
  host: 'webservices.amazon.in',
};

async function searchLaptops({ keywords }) {
  const endpoint = `https://${config.host}/paapi5/searchitems`;
  const payload = {
    PartnerTag: config.partnerTag,
    PartnerType: 'Associates',
    Marketplace: config.marketplace,
    Keywords: keywords || 'laptop',
    SearchIndex: 'Computers',
    ItemCount: 1,
    Resources: [
      'ItemInfo.Title',
      'DetailPageURL',
    ],
  };

  // Prepare signed request
  const opts = {
    host: config.host,
    method: 'POST',
    url: endpoint,
    path: '/paapi5/searchitems',
    service: 'ProductAdvertisingAPI',
    region: config.region,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Host': config.host,
    },
    body: JSON.stringify(payload),
  };
  aws4.sign(opts, { accessKeyId: config.accessKey, secretAccessKey: config.secretKey });

  try {
    const response = await axios.post(endpoint, payload, {
      headers: opts.headers,
    });
    if (response.data.Errors) {
      throw new Error(response.data.Errors[0].Message);
    }
    const items = response.data.SearchResult && response.data.SearchResult.Items ? response.data.SearchResult.Items : [];
    return items.map(item => ({
      title: item.ItemInfo?.Title?.DisplayValue,
      url: item.DetailPageURL, // This is your affiliate link
    }));
  } catch (error) {
    console.error('Amazon PA API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch laptops from Amazon');
  }
}

module.exports = { searchLaptops }; 