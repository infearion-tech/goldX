import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { GiDiamondRing } from 'react-icons/gi';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="gx-header">
      <div className="gx-container gx-header-inner">
        <motion.div className="gx-brand" initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <GiDiamondRing style={{ marginRight: 8 }} /> GoldX
        </motion.div>

  <nav id="primary-nav" className={`gx-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
          <motion.a whileHover={{ y: -2 }} href="#plans">Plans</motion.a>
          <motion.a whileHover={{ y: -2 }} href="#how">How it works</motion.a>
          <motion.a whileHover={{ scale: 1.03 }} href="#contact" className="gx-cta">Get Started</motion.a>
        </nav>

        <button className="gx-mobile-toggle" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="primary-nav">
          {open ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>
      </div>
    </header>
  );
}
