import "./styles.css";
import * as time from "./time";

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

const weatherCheck = async (e) => {
  e.preventDefault();
  const wsearch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`
  );
  const wsdata = await wsearch.json();

  const cardInfo = {
    city: wsdata.name,
    country: wsdata.sys.country,
    time: `${time.time(wsdata.dt)}`,
    date: `${time.currentDate(wsdata.dt)}`,
    description: wsdata.weather[0].description,
    tempC: `${Math.round(kelvinToCelsius(wsdata.main.temp))} °C`,
    tempF: `${Math.round(kelvinToFahrenheit(wsdata.main.temp))} °F`,
    feels_likeC: `${Math.round(kelvinToCelsius(wsdata.main.feels_like))} °C`,
    feels_likeF: `${Math.round(kelvinToFahrenheit(wsdata.main.feels_like))} °F`,
    humidity: `${wsdata.main.humidity} %`,
    wind: `${Math.round(wsdata.wind.speed)} m/s`,
    pressure: `${wsdata.main.pressure} hPa`,
    sunrise: `${time.time(wsdata.sys.sunrise)}`,
    sunset: `${time.time(wsdata.sys.sunset)}`,
    icon: wsdata.weather[0].icon,
  };

  screen.innerText = `yes`;
  console.log(cardInfo);
};

sbButton.addEventListener("click", weatherCheck);
