import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Sun, Cloud, CloudSnow, CloudLightning } from 'lucide-react';
import './Widgets.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Default to Tokyo if geolocation fails or is denied
        const defaultLocation = { lat: 35.6762, lon: 139.6503, name: 'NEO-TOKYO' };

        const fetchWeather = async (lat, lon, name = 'LOCAL') => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
                );
                const data = await response.json();

                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    humidity: data.current.relative_humidity_2m,
                    wind: Math.round(data.current.wind_speed_10m),
                    code: data.current.weather_code,
                    location: name
                });
                setLoading(false);
            } catch (err) {
                console.error("Weather fetch failed", err);
                setError("Offline");
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude, 'LOCAL OPS');
                },
                () => {
                    // Fallback on error
                    fetchWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation.name);
                }
            );
        } else {
            fetchWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation.name);
        }
    }, []);

    const getWeatherIcon = (code) => {
        if (code === 0) return <Sun size={48} color="var(--primary)" />;
        if (code >= 1 && code <= 3) return <Cloud size={48} color="var(--text-dim)" />;
        if (code >= 51 && code <= 67) return <CloudRain size={48} color="var(--secondary)" />;
        if (code >= 71 && code <= 77) return <CloudSnow size={48} color="#fff" />;
        if (code >= 95) return <CloudLightning size={48} color="#fecc00" />;
        return <Cloud size={48} color="var(--text-dim)" />;
    };

    if (loading) return (
        <div className="glass-panel widget-weather">
            <div className="weather-header"><span className="location-name">SCANNING...</span></div>
        </div>
    );

    return (
        <div className="glass-panel widget-weather">
            <div className="weather-header">
                <span className="location-name">{weather ? weather.location : 'OFFLINE'}</span>
                {weather && getWeatherIcon(weather.code)}
            </div>

            {weather && (
                <>
                    <div className="weather-temp">
                        <span className="temp-value">{weather.temp}°</span>
                        <span className="temp-unit">C</span>
                    </div>

                    <div className="weather-details">
                        <div className="detail-item">
                            <Wind size={16} color="var(--text-dim)" />
                            <span>{weather.wind} km/h</span>
                        </div>
                        <div className="detail-item">
                            <Droplets size={16} color="var(--text-dim)" />
                            <span>{weather.humidity}%</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherWidget;
