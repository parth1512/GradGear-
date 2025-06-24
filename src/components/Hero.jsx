import React from 'react'
import './styles/Hero.css';
import Aurora from './Aurora';
import SplashCursor from './SplashCursor';

export const Hero = () => {
  return (
    <>
    <div className="HeroBox">
    <div className="Hero">

      
       
   <Aurora
    colorStops={["#0232AB", "#0290FF", "#0232AB"]}
    blend={1}
    amplitude={1.0}
    speed={1.2}
  />

     
        <h1 className="First_Line">Struggling with your <span className="Laptop_txt_color"> laptop </span>selections?</h1>
        <h1 className="outlined_text">YOUR ONE STOP SOLUTION</h1> 
        <h1 className="GRAD">GRAD<span className="GEAR">GEAR</span></h1>
        {/* <h1 className="outlined_text_now">NOW!!!</h1>  */}
    </div>
    </div>
    
    </>
    
  )
}

export default Hero;