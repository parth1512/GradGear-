import React, { useState } from "react";
import "./styles/Hero.css";
import ResultsPage from "./ResultsPage.jsx";

export const Hero_2 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [slide, setSlide] = useState(1);
  const [budget, setBudget] = useState(50000); // Default budget value
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [otherText, setOtherText] = useState(''); // State for "other" text input
  const [travelFrequency, setTravelFrequency] = useState(''); // State for travel frequency (single selection)
  const [selectedDisplays, setSelectedDisplays] = useState([]); // State for display selections
  const [batteryLife, setBatteryLife] = useState(''); // State for battery life (single selection)
  const [preferredOS, setPreferredOS] = useState(''); // State for OS preference (single selection)
  const [selectedFeatures, setSelectedFeatures] = useState([]); // State for specific features (multi-selection)
  const [userEmail, setUserEmail] = useState(''); // State for user's email input
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const [showResults, setShowResults] = useState(false); // State for showing results page
  const [recommendations, setRecommendations] = useState(null); // State for storing recommendations
  const [isLoading, setIsLoading] = useState(false); // State for loading during API call
  const [notificationMessage, setNotificationMessage] = useState(''); // State for notification message
  const [notificationType, setNotificationType] = useState('success'); // State for notification type (success/error)

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSlide(1); // Reset to first slide on close
    setBudget(50000); // Reset budget as well
    setSelectedTags([]); // Reset selected tags
    setOtherText(''); // Reset other text
    setTravelFrequency(''); // Reset travel frequency
    setSelectedDisplays([]); // Reset display selections
    setBatteryLife(''); // Reset battery life
    setPreferredOS(''); // Reset OS preference
    setSelectedFeatures([]); // Reset specific features
    setUserEmail(''); // Reset email
  };

  // Function to handle tag selection
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // If tag is already selected, remove it
      setSelectedTags(selectedTags.filter(t => t !== tag));
      // If removing "other", clear the text
      if (tag === 'other') {
        setOtherText('');
      }
    } else {
      // If tag is not selected and we haven't reached max limit, add it
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  // Function to handle travel frequency selection (single selection)
  const handleTravelFrequencyClick = (frequency) => {
    setTravelFrequency(frequency);
  };

  // Function to handle display selection (conditional multi-selection)
  const handleDisplayClick = (display) => {
    if (selectedDisplays.includes(display)) {
      // Remove if already selected
      setSelectedDisplays(selectedDisplays.filter(d => d !== display));
    } else {
      // Add if not selected
      setSelectedDisplays([...selectedDisplays, display]);
    }
  };

  // Function to handle battery life selection (single selection)
  const handleBatteryLifeClick = (battery) => {
    setBatteryLife(battery);
  };

  // Function to handle OS preference selection (single selection)
  const handleOSClick = (os) => {
    setPreferredOS(os);
  };

  // Function to handle specific features selection (multi-selection)
  const handleFeatureClick = (feature) => {
    if (selectedFeatures.includes(feature)) {
      // Remove if already selected
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      // Add if not selected
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Check if "other" is selected
  const isOtherSelected = selectedTags.includes('other');

  // The tags array (kept outside for reuse)
  const tags = [
    "gaming", "research", "graphic designing", "entertainment", "programming",
    "CAD", "simulation", "architecture", "ui/ux design", "data analyst",
    "data scientist", "study", "trading", "movie streaming", "content creation",
    "3D design", "AI ML training", "business", "productivity", "cybersecurity",
    "writing", "health care", "medical", "AR VR", "IoT", "conference meetings",
    "ethical hacking", "other",
  ];

  // Function to collect all selections into an object
  const collectAllSelections = async () => {
    // Validate email
    if (!userEmail.trim()) {
      setNotificationMessage('Please enter your email address to continue.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
      return null;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.trim())) {
      setNotificationMessage('Please enter a valid email address.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
      return null;
    }

    const selections = {
      userEmail: userEmail.trim(), // Include user's email
      useCases: {
        selectedTags: selectedTags,
        otherText: otherText
      },
      budget: {
        amount: budget,
        currency: 'INR'
      },
      travelFrequency: travelFrequency,
      displayPreferences: selectedDisplays,
      batteryLife: batteryLife,
      operatingSystem: preferredOS,
      specificFeatures: selectedFeatures,
      timestamp: new Date().toISOString()
    };

    console.log('All Selections:', selections);
    
    // Store in localStorage
    localStorage.setItem('gradgearSelections', JSON.stringify(selections));
    
    return selections;
  };

  // Function to handle finish button click
  const handleFinish = async () => {
    const selections = await collectAllSelections();
    if (selections) {
      setIsLoading(true);
      
      try {
        // Call backend API
        const response = await fetch('http://localhost:5001/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selections)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          console.log('Received data from backend:', data);
          console.log('Setting recommendations to:', data.recommendations);
          setRecommendations(data.recommendations);
          setShowResults(true);
          setShowPopup(false);
          
          // Show success notification
          setNotificationMessage('Recommendations sent to your email!');
          setNotificationType('success');
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
        } else {
          throw new Error(data.error || 'Failed to get recommendations');
        }
        
      } catch (error) {
        console.error('Error getting recommendations:', error);
        setNotificationMessage('Sorry, we encountered an error while generating your recommendations. Please try again.');
        setNotificationType('error');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to handle going back to questionnaire
  const handleBackToQuestionnaire = () => {
    setShowResults(false);
    setRecommendations(null);
    setShowPopup(true);
    setSlide(1);
    // Reset all form data
    setSelectedTags([]);
    setOtherText('');
    setTravelFrequency('');
    setSelectedDisplays([]);
    setBatteryLife('');
    setPreferredOS('');
    setSelectedFeatures([]);
    setUserEmail('');
  };

  // If showing results, render the results page
  if (showResults && recommendations) {
    return (
      <ResultsPage 
        recommendations={recommendations}
        userEmail={userEmail}
        onBack={handleBackToQuestionnaire}
        showNotification={showNotification}
        notificationType={notificationType}
        notificationMessage={notificationMessage}
      />
    );
  }

  return (
    <>
      <div className="Hero_2">
        <h1 className="Title_txt">
          START YOUR JOURNEY OF THIS{" "}
          <span className="Laptop_txt_color">SELECTION</span> NOW
        </h1>
      </div>

      <div className="Hero_2">
        <p className="Sub_txt">
          Tailored recommendations based on your needs, budget, and goals.
        </p>
      </div>

      <br />
      <br />

      <div className="Hero_2">
        <button 
          className="start-now-btn" 
          onClick={handleButtonClick}
        >
          START NOW
        </button>
      </div>
      
      <div className="pop">
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              
              {/* Header */}
              <div className="pop_and_text">
                <div className="pop">
                  <h1 className="popup-title1">GETTING </h1>
                  <h1 className="popup-title2">STARTED </h1>
                </div>
                <div className="popup-description">
                  <p className="popup-description_disign">
                    Answer a few quick questions, and we'll recommend the best laptop
                    for you. <span className="Laptop_txt_color">This will only take a minute!</span>
                  </p>
                </div>
              </div>
              
              <hr />
              
              {/* Content */}
              <div className="popup-content">
                {/* Required fields note */}
                <div style={{ 
                  backgroundColor: 'rgba(255, 107, 107, 0.1)', 
                  border: '1px solid rgba(255, 107, 107, 0.3)', 
                  borderRadius: '8px', 
                  padding: '12px 16px', 
                  marginBottom: '20px',
                  fontSize: '14px',
                  color: '#ff6b6b'
                }}>
                  <strong>Note:</strong> All fields marked with * are required to proceed.
                </div>
                
                {/* Slide 1: Use Case */}
                {slide === 1 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Use case / purpose for laptop (Select up to 4) *</h2>
                      {selectedTags.length > 0 && (
                        <p className="selected-count">Selected: {selectedTags.length}/4</p>
                      )}
                    </div>
                    <div className="popup-tags">
                      {tags.map((tag) => (
                        <button 
                          className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`} 
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          disabled={!selectedTags.includes(tag) && selectedTags.length >= 4}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    
                    {/* Text input for "other" option */}
                    {isOtherSelected && (
                      <div className="other-input-container">
                        <input
                          type="text"
                          placeholder="Please specify your use case..."
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          className="other-text-input"
                        />
                      </div>
                    )}
                  </>
                )}
                
                {/* Slide 2: Budget Slider */}
                {slide === 2 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Budget (INR) *</h2>
                    </div>
                    <div className="budget-slider-container">
                      <input
                        type="range"
                        min={20000}
                        max={500000}
                        step={1000}
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                        style={{ width: '80%' }}
                      />
                      <div style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                        ₹{budget.toLocaleString()}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Slide 3: Travel Frequency */}
                {slide === 3 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">How frequently you take your laptop when you travel? *</h2>
                    </div>
                    <div className="options">
                      <button 
                        className={`option-button ${travelFrequency === 'ALWAYS' ? 'option-selected' : ''}`}
                        onClick={() => handleTravelFrequencyClick('ALWAYS')}
                      >
                        <p className="But_font">ALWAYS</p>
                      </button>
                      <button 
                        className={`option-button ${travelFrequency === 'SOMETIMES' ? 'option-selected' : ''}`}
                        onClick={() => handleTravelFrequencyClick('SOMETIMES')}
                      >
                        <p className="But_font">SOMETIMES</p>
                      </button>
                      <button 
                        className={`option-button ${travelFrequency === 'RARELY' ? 'option-selected' : ''}`}
                        onClick={() => handleTravelFrequencyClick('RARELY')}
                      >
                        <p className="But_font">RARELY</p>
                      </button>
                      <button 
                        className={`option-button ${travelFrequency === 'NEVER' ? 'option-selected' : ''}`}
                        onClick={() => handleTravelFrequencyClick('NEVER')}
                      >
                        <p className="But_font">NEVER</p>
                      </button>
                    </div>
                  </>
                )}
                
                {/* Slide 4: Display Type */}
                {slide === 4 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Choose your display type (Select multiple) *</h2>
                      {selectedDisplays.length > 0 && (
                        <p className="selected-count">Selected: {selectedDisplays.length}</p>
                      )}
                    </div>
                    <div className="options">
                      <button 
                        className={`option-button ${selectedDisplays.includes('COMPACT 13-14inches') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('COMPACT 13-14inches')}
                      >
                        <p className="But_font">COMPACT 13-14inches</p>
                      </button>
                      <button 
                        className={`option-button ${selectedDisplays.includes('STANDARD 15inches') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('STANDARD 15inches')}
                      >
                        <p className="But_font">STANDARD 15inches</p>
                      </button>
                      <button 
                        className={`option-button ${selectedDisplays.includes('LARGE 16-17inches') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('LARGE 16-17inches')}
                      >
                        <p className="But_font">LARGE 16-17inches</p>
                      </button>
                      <button 
                        className={`option-button ${selectedDisplays.includes('4k') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('4k')}
                      >
                        <p className="But_font">4k</p>
                      </button>
                      <button 
                        className={`option-button ${selectedDisplays.includes('QHD') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('QHD')}
                      >
                        <p className="But_font">QHD</p>
                      </button>
                      <button 
                        className={`option-button ${selectedDisplays.includes('FHD') ? 'option-selected' : ''}`}
                        onClick={() => handleDisplayClick('FHD')}
                      >
                        <p className="But_font">FHD</p>
                      </button>
                    </div>
                  </>
                )}
                
                {/* Slide 5: Battery Life */}
                {slide === 5 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">How important is battery life for you? *</h2>
                    </div>
                    <div className="options">
                      <button 
                        className={`option-button ${batteryLife === 'VERY IMPORTANT (8+ hours)' ? 'option-selected' : ''}`}
                        onClick={() => handleBatteryLifeClick('VERY IMPORTANT (8+ hours)')}
                      >
                        <p className="But_font">VERY IMPORTANT (8+ hours)</p>
                      </button>
                      <button 
                        className={`option-button ${batteryLife === 'MODRATE (3-4 hours)' ? 'option-selected' : ''}`}
                        onClick={() => handleBatteryLifeClick('MODRATE (3-4 hours)')}
                      >
                        <p className="But_font">MODRATE (3-4 hours)</p>
                      </button>
                      <button 
                        className={`option-button ${batteryLife === 'NOT A PRIORITY' ? 'option-selected' : ''}`}
                        onClick={() => handleBatteryLifeClick('NOT A PRIORITY')}
                      >
                        <p className="But_font">NOT A PRIORITY</p>
                      </button>
                      <button 
                        className={`option-button ${batteryLife === 'FAST CHARGING IS PRIORRITY' ? 'option-selected' : ''}`}
                        onClick={() => handleBatteryLifeClick('FAST CHARGING IS PRIORRITY')}
                      >
                        <p className="But_font">FAST CHARGING IS PRIORRITY</p>
                      </button>
                    </div>
                  </>
                )}
                
                {/* Slide 6: OS Preference */}
                {slide === 6 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Do you prefer specific OS? *</h2>
                    </div>
                    <div className="options">
                      <button 
                        className={`option-button ${preferredOS === 'WINDOWS' ? 'option-selected' : ''}`}
                        onClick={() => handleOSClick('WINDOWS')}
                      >
                        <p className="But_font">WINDOWS</p>
                      </button>
                      <button 
                        className={`option-button ${preferredOS === 'UBANTU' ? 'option-selected' : ''}`}
                        onClick={() => handleOSClick('UBANTU')}
                      >
                        <p className="But_font">UBANTU</p>
                      </button>
                      <button 
                        className={`option-button ${preferredOS === 'MAC OS' ? 'option-selected' : ''}`}
                        onClick={() => handleOSClick('MAC OS')}
                      >
                        <p className="But_font">MAC OS</p>
                      </button>
                      <button 
                        className={`option-button ${preferredOS === 'DOS' ? 'option-selected' : ''}`}
                        onClick={() => handleOSClick('DOS')}
                      >
                        <p className="But_font">DOS</p>
                      </button>
                    </div>
                  </>
                )}
                
                {/* Slide 7: Specific Features */}
                {slide === 7 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Do you require any specific feature (Select multiple)</h2>
                      {selectedFeatures.length > 0 && (
                        <p className="selected-count">Selected: {selectedFeatures.length}</p>
                      )}
                    </div>
                    <div className="options">
                      <button 
                        className={`option-button ${selectedFeatures.includes('TOUCHSCREEN') ? 'option-selected' : ''}`}
                        onClick={() => handleFeatureClick('TOUCHSCREEN')}
                      >
                        <p className="But_font">TOUCHSCREEN</p>
                      </button>
                      <button 
                        className={`option-button ${selectedFeatures.includes('DUAL DISPLAY') ? 'option-selected' : ''}`}
                        onClick={() => handleFeatureClick('DUAL DISPLAY')}
                      >
                        <p className="But_font">DUAL DISPLAY</p>
                      </button>
                      <button 
                        className={`option-button ${selectedFeatures.includes('HIGH PERFORMANCE GPU') ? 'option-selected' : ''}`}
                        onClick={() => handleFeatureClick('HIGH PERFORMANCE GPU')}
                      >
                        <p className="But_font">HIGH PERFORMANCE GPU</p>
                      </button>
                    </div>
                  </>
                )}

                {/* Slide 8: Email Input */}
                {slide === 8 && (
                  <>
                    <div className="popup-subtitle_container">
                      <h2 className="popup-subtitle">Enter your email address *</h2>
                      <p style={{ color: '#767676', fontSize: '0.9rem', marginTop: '10px' }}>
                        We'll send you personalized laptop recommendations based on your preferences.
                      </p>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        style={{
                          width: '100%',
                          maxWidth: '450px',
                          padding: '18px 24px',
                          fontSize: '16px',
                          fontWeight: '500',
                          border: '2px solid #e0e0e0',
                          borderRadius: '12px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#fafafa',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          color: '#333'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0290FF';
                          e.target.style.backgroundColor = '#ffffff';
                          e.target.style.boxShadow = '0 4px 16px rgba(2, 144, 255, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e0e0e0';
                          e.target.style.backgroundColor = '#fafafa';
                          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Footer */}
              <div className="popup-footer">
                <button 
                  className="back-button" 
                  onClick={slide === 2 ? () => setSlide(1) : 
                           slide === 3 ? () => setSlide(2) :
                           slide === 4 ? () => setSlide(3) :
                           slide === 5 ? () => setSlide(4) :
                           slide === 6 ? () => setSlide(5) :
                           slide === 7 ? () => setSlide(6) :
                           () => setSlide(8)}
                  disabled={
                    (slide === 1 && selectedTags.length === 0) ||
                    (slide === 2 && budget < 20000) ||
                    (slide === 3 && !travelFrequency) ||
                    (slide === 4 && selectedDisplays.length === 0) ||
                    (slide === 5 && !batteryLife) ||
                    (slide === 6 && !preferredOS) ||
                    (slide === 8 && (!userEmail.trim() || isLoading))
                  }
                >
                  BACK
                </button>
                
                <div className="Progress_bar">
                  <div className="progress-container">
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(slide / 8) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {slide} of 8
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={slide === 8 ? handleFinish : 
                           slide === 1 ? () => setSlide(2) : 
                           slide === 2 ? () => setSlide(3) :
                           slide === 3 ? () => setSlide(4) :
                           slide === 4 ? () => setSlide(5) :
                           slide === 5 ? () => setSlide(6) :
                           slide === 6 ? () => setSlide(7) :
                           () => setSlide(8)}
                  disabled={
                    (slide === 1 && selectedTags.length === 0) ||
                    (slide === 2 && budget < 20000) ||
                    (slide === 3 && !travelFrequency) ||
                    (slide === 4 && selectedDisplays.length === 0) ||
                    (slide === 5 && !batteryLife) ||
                    (slide === 6 && !preferredOS) ||
                    (slide === 8 && (!userEmail.trim() || isLoading))
                  }
                  className="next-button"
                  style={{
                    opacity: ((slide === 1 && selectedTags.length === 0) ||
                             (slide === 2 && budget < 20000) ||
                             (slide === 3 && !travelFrequency) ||
                             (slide === 4 && selectedDisplays.length === 0) ||
                             (slide === 5 && !batteryLife) ||
                             (slide === 6 && !preferredOS) ||
                             (slide === 8 && (!userEmail.trim() || isLoading))) ? 0.6 : 1,
                    cursor: ((slide === 1 && selectedTags.length === 0) ||
                            (slide === 2 && budget < 20000) ||
                            (slide === 3 && !travelFrequency) ||
                            (slide === 4 && selectedDisplays.length === 0) ||
                            (slide === 5 && !batteryLife) ||
                            (slide === 6 && !preferredOS) ||
                            (slide === 8 && (!userEmail.trim() || isLoading))) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {slide === 8 ? (isLoading ? 'Generating Recommendations...' : 'FINISH') : 'NEXT'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Notification */}
      {showNotification && (
        <div 
          className="custom-notification"
          style={{
            position: 'fixed',
            top: '30px',
            right: '30px',
            background: notificationType === 'success' ? '#0290FF' : '#e74c3c',
            color: 'white',
            padding: '18px 32px',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: `0 4px 24px ${notificationType === 'success' ? 'rgba(2, 144, 255, 0.15)' : 'rgba(231, 76, 60, 0.15)'}`,
            zIndex: 9999,
            animation: 'slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            maxWidth: '400px',
            wordWrap: 'break-word'
          }}
        >
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {notificationType === 'success' ? '✅ Success!' : '❌ Error!'}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {notificationMessage}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero_2;
