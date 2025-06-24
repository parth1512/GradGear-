import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import main_logo from '../assets/icons/main_logo.svg';

const Navbar = () => {
  const [showResults, setShowResults] = useState(false);

  // Check if we're on results page
  useEffect(() => {
    const checkForResults = () => {
      const resultsContainer = document.querySelector('.results-container');
      setShowResults(!!resultsContainer);
    };

    checkForResults();
    const observer = new MutationObserver(checkForResults);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToHome = () => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger the start over functionality to reset the results page
    setTimeout(() => {
      const startOverButton = document.querySelector('.start-over-btn');
      if (startOverButton) {
        startOverButton.click();
      } else {
        // Fallback: try to find and click the START NOW button
        const startNowButton = document.querySelector('.start-now-btn');
        if (startNowButton) {
          startNowButton.click();
        }
      }
    }, 800);
  };

  const scrollToFooter = () => {
    const footerElement = document.querySelector('.background-image');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <navbar >
      <div className="logo-container">
        <div className="inside-logo" onClick={scrollToHome} style={{ cursor: 'pointer' }}>
          <img src={main_logo} alt="logo" />
        </div>
        <div className="nav-links">
          {!showResults ? (
            <>
              <a href="#work" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>About</a>
              <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Service</a>
            </>
          ) : (
            <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); goBackToHome(); }}>Back to Home</a>
          )}
          <a href="#footer" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToFooter(); }}>Contact</a>
        </div>
      </div>
    </navbar>
  );
};

export default Navbar;