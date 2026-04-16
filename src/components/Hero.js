import React from 'react';
import { motion } from 'framer-motion';
import { GiGoldBar } from 'react-icons/gi';
import { FaCoins } from 'react-icons/fa';
import LivePrice from './LivePrice';

export default function Hero() {
  return (
    <section className="gx-hero">
      <div className="gx-container gx-hero-inner">
        <div className="gx-hero-copy">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>Let jewellers create attractive gold schemes — in-store and online</motion.h1>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Partner jewellers can offer schemes like "Pay 10 months, jeweller adds 1 month" or an "11-month 0% EMI" — customers join in-store or via the app and redeem as jewellery or stored gold.</motion.p>
          <div className="gx-hero-actions">
            <motion.a whileHover={{ scale: 1.03 }} className="btn primary" href="#plans"><FaCoins style={{marginRight:8}}/> For Jewellers</motion.a>
            <motion.a whileHover={{ scale: 1.03 }} className="btn ghost" href="#how" style={{marginLeft:12}}>How it works</motion.a>
          </div>

          <div style={{marginTop:18}}>
            <LivePrice pollInterval={10000} useMock={false} />
          </div>
        </div>
        <div className="gx-hero-art">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
            {/* Prefer using a local/public domain SVG at /public/hero.svg; fallback to simple icon */}
            <img src="/hero.svg" alt="gold illustration" style={{maxWidth:320,borderRadius:12}} onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div style={{display:'none'}}>
              <GiGoldBar size={88} color="#d4af37" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
