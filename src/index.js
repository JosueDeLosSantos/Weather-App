import "./styles.css";

const body = document.querySelector("body");
// Form
const form = document.createElement("form");
// Search box
const searchBox = document.createElement("input");
searchBox.setAttribute("type", "search");
searchBox.setAttribute("placeholder", "Enter city name");
searchBox.value = "samana";
// Button
const sbButton = document.createElement("button");
sbButton.innerText = "Search";
// Screen
const screen = document.createElement("div");
screen.classList.add("screen");

body.appendChild(form);
form.appendChild(searchBox);
form.appendChild(sbButton);
body.appendChild(screen);

function kelvinToCelsius(value) {
  return value - 273.15;
}

function kelvinToFahrenheit(value) {
  return kelvinToCelsius(value) * 1.8 + 32;
}

// Celsius
const weatherCheck = async (e) => {
  e.preventDefault();
  const wsearch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`
  );
  const wsdata = await wsearch.json();

  const cardInfo = {
    city: wsdata.name,
    country: wsdata.sys.country,
    time: wsdata.dt,
    description: wsdata.weather[0].description,
    temp: wsdata.main.temp,
    feels_like: wsdata.main.feels_like,
    temp_min: wsdata.main.temp_min,
    temp_max: wsdata.main.temp_max,
    humidity: wsdata.main.humidity,
    wind: wsdata.wind.speed,
    pressure: wsdata.main.pressure,
    sunrise: wsdata.sys.sunrise,
    sunset: wsdata.sys.sunset,
  };

  screen.innerText = `yes`;
  console.log(cardInfo);
};

sbButton.addEventListener("click", weatherCheck);
