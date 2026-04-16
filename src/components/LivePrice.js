import React from 'react';
import useGoldPrice from '../hooks/useGoldPrice';

export default function LivePrice({ pollInterval = 10000, url, apiKey, useMock = false }) {
  const { price, currency, loading, error, lastUpdated } = useGoldPrice({ pollInterval, url, apiKey, useMock });

  return (
    <div className="live-price">
      <div className="live-price-inner">
        <div className="label">Live Gold Price</div>
        <div className="value">
          {loading ? 'Loading...' : error ? `Error` : `${currency} ${Number(price).toLocaleString()}`}
        </div>
        <div className="meta">{lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : ''}</div>
      </div>
      {error ? <div className="live-error">{error}</div> : null}
    </div>
  );
}
