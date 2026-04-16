import React from 'react';

const planData = [
  {
    id: 'eleven-take-jewellery',
    title: '11-month — Take jewellery with no making charges',
    price: 'Pay 11 EMIs; take jewellery and pay only gold value (no making charges)',
    weight: 'Available at participating jewellers',
    perks: ['EMIs act as customer guarantee ("will") to the shop', 'No making charges when jewellery is taken under this scheme', 'Activate and complete through the jeweller or the app']
  },
  {
    id: 'tenplusone',
    title: '10 + 1 (Jeweller contribution)',
    price: 'Pay 10 monthly EMIs — jeweller adds 1 month',
    weight: 'Terms set by jeweller',
    perks: ['Scheme created by the jeweller', 'Extra month contributed by jeweller', 'Redeem or convert to jewellery as per shop policy']
  },
  {
    id: 'eleven-zero',
    title: '11-month 0% EMI',
    price: 'Pay over 11 months at 0% markup (where offered)',
    weight: 'Terms vary by jeweller',
    perks: ['No interest when jeweller offers 0% plan', 'Monthly tokenized gold credit', 'In-store benefits and offers']
  },
  {
    id: 'custom',
    title: 'Custom In-store Scheme',
    price: 'Configured by the jeweller',
    weight: 'Flexible',
    perks: ['Flexible EMI durations', 'Special discounts or contributions', 'Activate directly at the jeweller']
  }
];

export default function Plans() {
  return (
    <section id="plans" className="gx-plans">
      <div className="gx-container">
  <h2>Jeweller-created schemes</h2>
  <p className="subtitle">Featured: Pay 11 months and take jewellery paying only the gold value (no making charges) — plus other in-store schemes like pay 10 months and get 1 month contributed by the jeweller.</p>
        <div className="plan-grid">
          {planData.map(p => (
            <article key={p.id} className={`plan-card plan-${p.id}`}>
              <h3>{p.title}</h3>
              <div className="plan-weight">{p.weight}</div>
              <div className="plan-price">{p.price}</div>
              <ul className="plan-perks">
                {p.perks.map((k, i) => <li key={i}>{k}</li>)}
              </ul>
              <a className="btn primary" href="#contact">View schemes</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
