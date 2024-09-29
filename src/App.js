import React, { useEffect, useState } from "react";
import "./App.css";

const api = {
  //   key: "00f3b2bc7d59e61f7cdf83217f5075e1",
  key: "51f1a56d56a5b28d57a7a2b08fd74cc1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      // console.log("Searching");
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}: ${data.weather[0].description}`
          );
          setWeatherIcon(data.weather[0].icon);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div className="container">
      <h1>Check the weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        // Cần gói code javascript vào trong fragment
        <>
          {errorMessage ? (
            <div className="error">{errorMessage}</div>
          ) : (
            <div className="result">
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt={weatherIcon}
              />
              <p>{weatherInfo}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
