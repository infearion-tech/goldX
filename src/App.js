import React from 'react';
import './styles/landing.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Plans from './components/Plans';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="gx-app">
      <Header />
      <main>
        <Hero />
        <Plans />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
