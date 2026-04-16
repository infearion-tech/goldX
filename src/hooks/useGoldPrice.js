import { useState, useEffect, useRef } from 'react';

/**
 * useGoldPrice - polls a gold price API at an interval and returns the latest value.
 * Configurable via REACT_APP_GOLD_API_URL and REACT_APP_GOLD_API_KEY or via props.
 * Falls back to a lightweight mock when REACT_APP_USE_MOCK is 'true'.
 */
export default function useGoldPrice({ pollInterval = 10000, url, apiKey, useMock = false } = {}) {
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timer = null;

    async function fetchPrice() {
      if (useMock || process.env.REACT_APP_USE_MOCK === 'true') {
        // Simple mock: base around 5200 INR with a small jitter
        const mock = Number((5200 + Math.random() * 250).toFixed(2));
        if (mounted.current) {
          setPrice(mock);
          setCurrency('INR');
          setLoading(false);
          setLastUpdated(new Date());
        }
        return;
      }

      const apiUrl = url || process.env.REACT_APP_GOLD_API_URL || 'https://data-asg.goldprice.org/dbXRates/USD';
      const key = apiKey || process.env.REACT_APP_GOLD_API_KEY || '';

      try {
        setLoading(true);
        const headers = key ? { Authorization: `Bearer ${key}` } : {};
        const res = await fetch(apiUrl, { headers });
        if (!res.ok) {
          // Handle common authorization / CORS problems with a clearer message
          if (res.status === 401 || res.status === 403) {
            const msg = `API access error: ${res.status} ${res.statusText} - the endpoint blocked access (CORS or unauthorized).`;
            // If mock mode is enabled, fall back to mock values and surface the message in error
            if (useMock || process.env.REACT_APP_USE_MOCK === 'true') {
              console.warn(msg + ' Falling back to mock data because mock mode is enabled.');
            } else {
              // Non-mock: populate a deterministic lightweight mock so UI remains informative,
              // but still set the error so the app knows the API failed.
              if (mounted.current) {
                const fallback = Number((5200 + Math.random() * 200).toFixed(2));
                setPrice(fallback);
                setCurrency('INR');
                setError(msg + ' Using local fallback price.');
                setLastUpdated(new Date());
                setLoading(false);
              }
              // don't throw, continue (we still want polling to continue)
            }
          } else {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
          }
        }
        const json = await res.json();

        // Try to extract a reasonable numeric price from a few common API shapes
        let val = null;
        let curr = 'USD';
        if (json == null) throw new Error('Empty response');
        if (typeof json === 'number') val = json;
        else if (json.price) { val = json.price; curr = json.currency || curr; }
        else if (json.data && (json.data.amount || json.data.price)) { val = json.data.amount || json.data.price; curr = json.data.currency || curr; }
        else if (json.rates && json.rates.XAU) { val = json.rates.XAU; curr = 'XAU'; }
        else if (Array.isArray(json.items) && json.items[0]) { val = json.items[0].xauPrice || json.items[0].price || null; curr = json.items[0].currency || curr; }
        else if (Array.isArray(json) && json[0] && (json[0].price || json[0].value)) { val = json[0].price || json[0].value; }

        if (val == null) throw new Error('Unexpected API response shape');

        if (mounted.current) {
          setPrice(Number(val));
          setCurrency(curr);
          setError(null);
          setLastUpdated(new Date());
          setLoading(false);
        }
      } catch (err) {
        if (mounted.current) {
          setError(err.message || String(err));
          setLoading(false);
        }
      }
    }

    // initial fetch
    fetchPrice();
    // polling
    timer = setInterval(fetchPrice, pollInterval);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pollInterval, url, apiKey, useMock]);

  return { price, currency, loading, error, lastUpdated };
}
