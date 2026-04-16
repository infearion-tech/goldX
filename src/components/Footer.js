import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="contact" className="gx-footer">
      <div className="gx-container gx-footer-inner">
        <div>
          <strong>GoldX</strong>
          <p>Secure gold purchase plans. Small monthly buys. Flexible exits.</p>
        </div>
        <div className="links">
          <a href="#plans">Plans</a>
          <a href="#how">How it works</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
      <motion.div className="gx-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>© {new Date().getFullYear()} GoldX — Built with care</motion.div>
    </footer>
  );
}
