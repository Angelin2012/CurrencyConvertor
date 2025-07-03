import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then(response => response.json())
      .then(data => setExchangeRate(data.rates))
      .catch(error => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const availableCurrencies = useMemo(() => Object.keys(exchangeRate), [exchangeRate]);

  const convert = () => {
    const rate = exchangeRate[toCurrency];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          ref={inputRef}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {availableCurrencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>

        <span>to</span>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {availableCurrencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>

        <button onClick={convert}>Convert</button>

        {convertedAmount && (
          <h2>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
