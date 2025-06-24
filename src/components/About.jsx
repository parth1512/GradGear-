import React from 'react'
import "./styles/About.css"
import SpotlightCard from "./SpotlightCard";

export const About = () => {
  return (
    <>
    <div className="Main" id="about">
        <div className="Inner_div">
        <div className="Title">
        <h1 className="Primary_text1">SHOP SMART</h1>
        </div>
        <div className="Title">
        <h1 className="Primary_text2">SHOP TRUSTED</h1>
        </div>
        <div className='Sub_div'>
            <h2 className='Sub_text'>Your One-Stop Laptop Shopping Experience</h2>
        </div>

        <div className='Sub_para'>
                <p className='Sub_para_text'>We understand the importance of getting the right laptop for your needs,<br/>
                and that's why we offer two options to make sure you're making an informed decision:</p>
            </div>
            </div>

<div className="box2">


            <div className="Card2">
              <SpotlightCard className="custom-spotlight-card2" spotlightColor="rgba(2, 144, 255, 0.4)">
              <h2 className="Card_text">Redirect to Trusted 
              Online Platforms:</h2>
              <p className="Card_subtext">Be directed to well-known 
and secure e-commerce 
websites like Amazon, Flipkart, 
and others. 
<br/><br/>
Our partners are carefully 
selected to guarantee a 
smooth, safe, and genuine 
online shopping experience. 
<br/><br/>
No more guesswork—just 
reliable options at your fingertips.</p>

              </SpotlightCard>
              </div>

              <div className="Card2">
              <SpotlightCard className="custom-spotlight-card2" spotlightColor="rgba(2, 144, 255, 0.4)">
              <h2 className="Card_text">Find Local Vendors 
              Near You:</h2>
              <p className="Card_subtext">Sometimes, nothing beats the feel 
of seeing and testing the laptop
 in person.
 <br/> <br/>
With GradGear, we show you 
the nearest local vendors who 
have the specific model you're 
interested in.  <br/> <br/>
You can check out the laptop's 
design, features, and performance, 
and even make your purchase 
on the spot from a trusted 
store near you.</p>

              </SpotlightCard>
              </div>
        </div>
</div>
        

    


    </>
  )
}

export default About;