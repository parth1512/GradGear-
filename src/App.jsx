import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from "./components/Hero";
import Hero_2 from "./components/Hero_2"
import BottomBar from './components/BottomBar';
import Work from './components/Work'
import About from './components/About'
import Footer from './components/Footer'

export const App = () => {
  const [showResults, setShowResults] = useState(false);

  // Listen for when results are shown/hidden
  useEffect(() => {
    const checkForResults = () => {
      const resultsContainer = document.querySelector('.results-container');
      setShowResults(!!resultsContainer);
    };

    // Check initially
    checkForResults();

    // Set up observer to watch for changes
    const observer = new MutationObserver(checkForResults);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        <Navbar/>
      </nav>
      <Hero/>
      <br/>
      <Hero_2/>
      {!showResults && (
        <>
          <BottomBar/>
          <br/>
          <Work/>
          <br/>
          <About/>
        </>
      )}
      <Footer/>
    </>
  )
}

export default App 
