import React from 'react'
import './styles/Hero.css';
import Aurora from './Aurora';
import { motion } from 'framer-motion';
import acer from '../assets/logos/acer.png';
import asus from '../assets/logos/asus.png';
import dell from '../assets/logos/dell.png';
import hp from '../assets/logos/hp.png';
import lenovo from '../assets/logos/lenovo.png';
import msi from '../assets/logos/msi.png';
import samsung from '../assets/logos/samsung.png';


function BottomBar() {
  return (
   <div className="Bottom_bar_outer">

    <motion.div 
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
          
        {/* Logos with enough duplicates for seamless loop */}
        <div className="asus-row">
          <img src={asus} alt="asus" className="asus" />
          <img src={dell} alt="dell" className="asus" />
          <img src={hp} alt="hp" className="asus" />
          <img src={lenovo} alt="lenovo" className="asus" />
          <img src={msi} alt="msi" className="asus" />
          <img src={acer} alt="acer" className="asus" />
          <img src={samsung} alt="samsung" className="asus" />

          <img src={asus} alt="asus" className="asus" />
          <img src={dell} alt="dell" className="asus" />
          <img src={hp} alt="hp" className="asus" />
          <img src={lenovo} alt="lenovo" className="asus" />
          <img src={msi} alt="msi" className="asus" />
          <img src={acer} alt="acer" className="asus" />
          <img src={samsung} alt="samsung" className="asus" />

          <img src={asus} alt="asus" className="asus" />
          <img src={dell} alt="dell" className="asus" />
          <img src={hp} alt="hp" className="asus" />
          <img src={lenovo} alt="lenovo" className="asus" />
          <img src={msi} alt="msi" className="asus" />
          <img src={acer} alt="acer" className="asus" />
          <img src={samsung} alt="samsung" className="asus" />

          <img src={asus} alt="asus" className="asus" />
          <img src={dell} alt="dell" className="asus" />
          <img src={hp} alt="hp" className="asus" />
          <img src={lenovo} alt="lenovo" className="asus" />
          <img src={msi} alt="msi" className="asus" />
          <img src={acer} alt="acer" className="asus" />
          <img src={samsung} alt="samsung" className="asus" />

          <img src={asus} alt="asus" className="asus" />
          <img src={dell} alt="dell" className="asus" />
          <img src={hp} alt="hp" className="asus" />
          <img src={lenovo} alt="lenovo" className="asus" />
          <img src={msi} alt="msi" className="asus" />
          <img src={acer} alt="acer" className="asus" />
          <img src={samsung} alt="samsung" className="asus" />
        </div>

    </motion.div>

    </div>
  )
}

export default BottomBar;