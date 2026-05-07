import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH WEATHER
  const getWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://app-backend-production-89a2.up.railway.app/api/weather?lat=${lat}&lon=${lon}`
      );

      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load weather");
      setLoading(false);
    }
  };

  // GET LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading Weather...</h2>
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div style={styles.center}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.city}>{data.name}</h1>

        <img
          style={styles.icon}
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather"
        />

        <h2 style={styles.temp}>
          {Math.round(data.main.temp)}°C
        </h2>

        <p style={styles.desc}>
          {data.weather[0].description}
        </p>

        <div style={styles.row}>
          <div style={styles.box}>
            <p>Humidity</p>
            <span>{data.main.humidity}%</span>
          </div>

          <div style={styles.box}>
            <p>Wind</p>
            <span>{data.wind.speed} km/h</span>
          </div>

          <div style={styles.box}>
            <p>Feels Like</p>
            <span>{Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>

      </div>
    </div>
  );
};

// INLINE CSS OBJECT
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Arial",
  },

  card: {
    width: "320px",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  city: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  icon: {
    width: "120px",
  },

  temp: {
    fontSize: "48px",
    margin: "10px 0",
  },

  desc: {
    textTransform: "capitalize",
    fontSize: "18px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  box: {
    textAlign: "center",
    fontSize: "14px",
  },

  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Weather;