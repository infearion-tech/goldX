import React from 'react';

const steps = [
  { title: 'Visit partner jeweller', desc: 'Jeweller registers a scheme in their shop — examples: pay 10 months and jeweller adds 1 month, or offer 11-month 0% EMI.' },
  { title: 'Customer joins', desc: 'Customer opts into the jeweller scheme and pays EMIs through the app or directly in-store.' },
  { title: 'Jeweller contribution & redemption', desc: 'When terms complete, jeweller contributes their month (or honors 0% EMI) and customer can redeem or convert credits into jewellery as per shop policy.' }
];

export default function HowItWorks() {
  return (
    <section id="how" className="gx-how">
      <div className="gx-container">
        <h2>How jeweller schemes work</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{i+1}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
