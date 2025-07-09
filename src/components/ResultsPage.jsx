import React, { useState, useEffect } from 'react';
import './styles/ResultsPage.css';

const ResultsPage = ({ recommendations, userEmail, onBack, showNotification, notificationType, notificationMessage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localShowNotification, setLocalShowNotification] = useState(showNotification);
  const [localNotificationMessage, setLocalNotificationMessage] = useState('');

  console.log('ResultsPage received recommendations:', recommendations);
  console.log('recommendations.recommendations:', recommendations?.recommendations);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    if (showNotification) {
      setLocalShowNotification(true);
      setTimeout(() => setLocalShowNotification(false), 5000);
    }
  }, [showNotification]);

  const handleAmazonClick = (laptop, linkType) => {
    setLoading(true);
    
    // Track the click (you can add analytics here)
    console.log(`User clicked ${linkType} link for ${laptop.model}`);
    
    // Open Amazon link in new tab
    const link = linkType === 'search' ? laptop.amazonLink : laptop.directLink;
    window.open(link, '_blank');
    
    setLoading(false);
  };

  const handleBackToStart = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('https://gradgear.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          recommendations: recommendations
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Show success notification
        setLocalNotificationMessage('Recommendations sent to your email successfully!');
        setLocalShowNotification(true);
        setTimeout(() => setLocalShowNotification(false), 5000);
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Show error notification
      setLocalNotificationMessage('Failed to send email. Please try again.');
      setLocalShowNotification(true);
      setTimeout(() => setLocalShowNotification(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="results-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleBackToStart} className="back-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      {/* Notification */}
      {localShowNotification && (
        <div className={`notification ${localNotificationMessage.includes('successfully') ? 'success' : 'error'}`}>
          <span>{localNotificationMessage}</span>
        </div>
      )}
      {/* Header */}
      <div className="results-header">
        <div className="header-content">
          <h1>Your Personalized Laptop Recommendations</h1>
          <p>Based on your preferences, here are the best laptops for you</p>
          <div className="user-info">
            <span>Recommendations for: {userEmail}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {recommendations.summary && (
        <div className="summary-section">
          <h2>Recommendation Summary</h2>
          <p>{recommendations.summary}</p>
        </div>
      )}

      {/* Recommendations */}
      <div className="recommendations-grid">
        {recommendations.recommendations.map((laptop, index) => (
          <div key={index} className="laptop-card">
            <div className="card-header">
              <div className="rank-badge">#{laptop.rank}</div>
              <h3>{laptop.model}</h3>
              <p className="brand">{laptop.brand}</p>
              <p className="price">{laptop.price}</p>
            </div>

            <div className="card-body">
              <div className="reasoning">
                <h4>Why this laptop?</h4>
                <p>{laptop.reasoning}</p>
              </div>

              <div className="key-features">
                <h4>Key Features:</h4>
                <ul>
                  {laptop.keyFeatures.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-actions">
              <button
                onClick={() => handleAmazonClick(laptop, 'search')}
                className="amazon-search-btn"
                disabled={loading}
              >
                {loading ? 'Opening...' : 'View on Amazon'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="results-footer">
        <div className="footer-content">
          <p>
            💡 <strong>Pro Tip:</strong> Compare prices and read reviews before making your final decision.
          </p>
          <button onClick={handleBackToStart} className="start-over-btn">
            Start Over
          </button>
          <button onClick={handleSendEmail} className="send-email-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Recommendations on Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 