import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/style.css';
import { FaExchangeAlt } from "react-icons/fa";
import ThemeApp from "./ThemeApp";

function App() {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem("conversionHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleConvert = async (e) => {
        e.preventDefault();
        try {
            const apiKey ="2118efb3c7cb1508dab3c961";
            const response = await axios.get(
                `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
            );

            const rate = response.data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            const newEntry = {
                amount,
                fromCurrency,
                toCurrency,
                result: convertedAmount,
                date: new Date().toLocaleString(),
            };

            setResult(convertedAmount);
            setError("");

            setHistory((prevHistory) => {
                const updatedHistory = [newEntry, ...prevHistory];
                localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
                return updatedHistory;
            });
        } catch (error) {
            setError("Hubo un error al obtener los datos.");
            setResult(null);
        }
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("conversionHistory");
    };

    return (
        <ThemeApp>
            <div className="converter-container">
                <form onSubmit={handleConvert} className="converter-form">
                    <div className="form-group">
                        <label htmlFor="amount">Monto:</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fromCurrency">Desde:</label>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            <option value="USD">Dólar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">Libra (GBP)</option>
                            <option value="ARS">Peso Argentino (ARS)</option>
                            <option value="VES">Venezuelan Bolívar Soberano (VES)</option>
                            <option value="RUB">Russian Ruble (RUB)</option>
                            <option value="AUD">Australian Dollar (AUD)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="toCurrency">Hacia:</label>
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            <option value="USD">Dólar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">Libra (GBP)</option>
                            <option value="ARS">Peso Argentino (ARS)</option>
                            <option value="VES">Venezuelan Bolívar Soberano (VES)</option>
                            <option value="RUB">Russian Ruble (RUB)</option>
                            <option value="AUD">Australian Dollar (AUD)</option>
                        </select>
                    </div>
                    <button type="submit" className="convert-button">
                        <FaExchangeAlt /> Convertir
                    </button>
                </form>
                {result && <div className="result">Resultado: {result} {toCurrency}</div>}
                {error && <div className="error">{error}</div>}
            </div>

            <div className="history-container">
                <div className="history-header">
                    <h2>Historial de conversiones</h2>
                    {history.length > 0 && (
                        <button className="clear-history-btn" onClick={clearHistory}>
                            Borrar historial
                        </button>
                    )}
                </div>
                {history.length === 0 ? (
                    <p>No hay conversiones aún.</p>
                ) : (
                    <ul className="history-list">
                        {history.map((entry, index) => (
                            <li key={index} className="history-item">
                                {entry.amount} {entry.fromCurrency} → {entry.result} {entry.toCurrency} ({entry.date})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ThemeApp>
    );
}

export default App;

