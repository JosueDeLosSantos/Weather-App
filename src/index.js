import "./styles.css";

const body = document.querySelector("body");
// Search box
const searchBox = document.createElement("input");
searchBox.setAttribute("type", "search");
searchBox.setAttribute("placeholder", "Enter city name");
searchBox.value = "samana";
// Button
const sbButton = document.createElement("button");
sbButton.innerText = "Search";
sbButton.setAttribute("name", "Search");
// Screen
const screen = document.createElement("div");
screen.classList.add("screen");

body.appendChild(searchBox);
body.appendChild(sbButton);
body.appendChild(screen);

function kelvinToCelsius(value) {
  return value - 273.15;
}

function kelvinToFahrenheit(value) {
  return kelvinToCelsius(value) * 1.8 + 32;
}

// Celsius
const weatherCheckC = async () => {
  const wsearch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`
  );
  const wsdata = await wsearch.json();

  const wmain = wsdata.main;
  const wWeather = wsdata.weather;
  const wWind = wsdata.wind;

  const mObject = [wmain, wWeather, wWind];

  screen.innerText = `${Math.round(kelvinToCelsius(mObject[0].temp))}`;
  console.log(mObject[0].temp);
  console.log(mObject);
};

sbButton.addEventListener("click", weatherCheckC);
