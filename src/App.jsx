import { useState, useEffect } from 'react';
import './App.css';

// OpenWeatherMap API anahtarını buraya yapıştır.
const API_KEY = '1cfdaa1dab347ff5c2bf074fe3d6b321'; 

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Istanbul");
  const [input, setInput] = useState("");

  useEffect(() => {
    setLoading(true);
    setWeatherData(null);
    setError(null);
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Şehir bulunamadı veya bir API hatası oluştu.");
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() === "") return; // Boş arama yapmayı engelle
    setCity(input);
    setInput(""); // Arama yaptıktan sonra input'u temizle
  };

  return (
    <div className="weather-app">
      <h1>React Hava Durumu</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Bir şehir girin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ara</button>
      </form>

      <div className="weather-display">
        {loading && <p>Yükleniyor...</p>}
        {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
        {weatherData && (
          <>
            <h2>{weatherData.name}</h2>
            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            <p>{weatherData.weather[0].description}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;