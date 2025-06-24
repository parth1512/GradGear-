import React from 'react'
import "./styles/Hero.css";
import SpotlightCard from "./SpotlightCard";


function Work() {
  return (
    <>
    <div className="Hero_2" id="work">
       <h1 className="Title_txt">How do we <span className="Laptop_txt_color">WORK</span> ???</h1> 
        </div>

        <div className="Hero_2">
  <p className="Sub_txt">From your needs to the perfect match—here's 
  how we simplify the process for you.</p>
  </div>
<br/><br/><br/>

<div className="Outer">

    <div className="Card">
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(2, 144, 255, 0.4)">
    <h1 className="Card_maintxt">STEP <span className="Laptop_txt_color"> 01</span> </h1>
    <h2 className="Card_subtxt">Understand your <span className="Laptop_txt_color">needs</span></h2>
    <p className="Sub_txt_Card">You answer a 
few quick questions 
about your budget, 
usage, and preferences</p>
  </SpotlightCard>
    </div>

    <div className="Card">
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(2, 144, 255, 0.4)">
    <h1 className="Card_maintxt">STEP <span className="Laptop_txt_color"> 02</span> </h1>
    <h2 className="Card_subtxt">Start <span className="Laptop_txt_color">Matching</span></h2>
    <p className="Sub_txt_Card">Our AI-powered system 
analyzes your responses 
and compares thousands 
of laptops.</p>
  </SpotlightCard>
    </div>

    <div className="Card">
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(2, 144, 255, 0.4)">
    <h1 className="Card_maintxt">STEP <span className="Laptop_txt_color"> 03</span> </h1>
    <h2 className="Card_subtxt">Get tailored <span className="Laptop_txt_color">Recommendation</span></h2>
    <p className="Sub_txt_Card">We provide a curated 
list of the best laptops 
for your requirements.</p>
  </SpotlightCard>
    </div>
  
</div>

<div className="EmptyDiv">

</div>
<div className="Outer">
<div className="Card">
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(2, 144, 255, 0.4)">
    <h1 className="Card_maintxt">STEP <span className="Laptop_txt_color"> 04</span> </h1>
    <h2 className="Card_subtxt">Compare & <span className="Laptop_txt_color"> Decide</span></h2>
    <p className="Sub_txt_Card">Easily compare 
specifications, prices, 
and reviews to make an 
informed decision</p>
  </SpotlightCard>
    </div>

    <div className="Card">
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(2, 144, 255, 0.4)">
    <h1 className="Card_maintxt">STEP <span className="Laptop_txt_color"> 05</span> </h1>
    <h2 className="Card_subtxt">Purchase with 
    <span className="Laptop_txt_color"> Confidence</span></h2>
    <p className="Sub_txt_Card">We guide you to trusted 
retailers for hassle-free 
shopping</p>
  </SpotlightCard>
    </div>

</div>


    </>
    
  )
}

export default Work