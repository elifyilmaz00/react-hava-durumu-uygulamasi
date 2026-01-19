import { useState } from 'react';
import './App.css';
// Kendi yazdığımız hook'u import ediyoruz!
import useFetch from './hooks/useFetch'; // Dosya yolunu kontrol et

const API_KEY = '1cfdaa1dab347ff5c2bf074fe3d6b321'; 

function App() {
  const [city, setCity] = useState("Istanbul");
  const [input, setInput] = useState("");

  // API URL'ini oluşturuyoruz.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`;

  // useFetch hook'unu çağırıyoruz. Ona sadece URL'i veriyoruz.
  // O da bize ihtiyacımız olan her şeyi (data, loading, error) bir nesne olarak veriyor.
  const { data: weatherData, loading, error } = useFetch(apiUrl);
  // 'data' adını 'weatherData' olarak değiştirmek için destructuring'de alias (takma ad) kullanıyoruz.

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setCity(input);
    setInput("");
  };

  return (
    <div className="weather-app">
      <h1>React Hava Durumu (Custom Hook ile)</h1>
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