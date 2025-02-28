import React, { useState, useEffect } from "react";

function ThemeApp({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Conversor de Moneda</h1>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </header>
            <main className="app-main">
                {children}
            </main>
        </div>
    );
}

export default ThemeApp;

