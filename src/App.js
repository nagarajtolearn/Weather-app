import hotBg from "./assets/sunny.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      const thershold = units === "metric" ? 20 : 60;
      if (data.temp <= thershold) {
        setBg(coldBg);
      } else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? `${`\u00B0`}F` : `${`\u00B0`}C`;
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter city..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>{`\u00B0`}F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name} ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather-icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                {weather.temp.toFixed()} {`\u00B0`}
                {units === "metric" ? "C" : "F"}
              </div>
            </div>
            {/* botton description */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
