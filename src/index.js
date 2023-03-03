import "./styles.css";
import * as time from "./time";
import sunIcon from "./icons/sunny.svg";
import warningIcon from "./icons/warning.svg";
import searchIcon from "./icons/search.svg";
import githubIcon from "./icons/github.svg";

const body = document.querySelector("body");
// Title
const title = document.createElement("div");
title.dataset.class = "title";
title.innerText = "Weather app";
// Title container
const titleC = document.createElement("div");
titleC.dataset.class = "titleC";
// Icon
const sunnyIcon = new Image();
sunnyIcon.src = sunIcon;
sunnyIcon.dataset.class = "sunnyIcon";

body.appendChild(titleC);
titleC.appendChild(title);
titleC.appendChild(sunnyIcon);
// Form
const form = document.createElement("form");
// Search box
const searchBox = document.createElement("input");
searchBox.setAttribute("type", "search");
searchBox.setAttribute("placeholder", "Enter city name");
// Button
const sbButton = document.createElement("button");
sbButton.dataset.sbBvalue = "before";
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

const cityName = document.createElement("div");
cityName.classList.add("cityName");
screen.appendChild(cityName);

const daytime = document.createElement("div");
daytime.classList.add("daytime");
screen.appendChild(daytime);

const description = document.createElement("div");
description.classList.add("description");
screen.appendChild(description);

const allInfo = document.createElement("div");
allInfo.classList.add("allInfo");
screen.appendChild(allInfo);

const rightInfo = document.createElement("div");
rightInfo.classList.add("rightInfo");
const centerInfo = document.createElement("div");
centerInfo.classList.add("centerInfo");
const leftInfo = document.createElement("div");
leftInfo.classList.add("leftInfo");
allInfo.appendChild(leftInfo);
allInfo.appendChild(centerInfo);
allInfo.appendChild(rightInfo);

const temp = document.createElement("div");
temp.classList.add("temp");
leftInfo.appendChild(temp);

const feelsLike = document.createElement("div");
feelsLike.classList.add("feelsLike");
leftInfo.appendChild(feelsLike);

const humidity = document.createElement("div");
humidity.classList.add("humidity");
rightInfo.appendChild(humidity);

const icon = new Image();
icon.classList.add("icon");
centerInfo.appendChild(icon);

const wind = document.createElement("div");
wind.classList.add("wind");
rightInfo.appendChild(wind);

const sunrise = document.createElement("div");
sunrise.classList.add("sunrise");
leftInfo.appendChild(sunrise);

const sunset = document.createElement("div");
sunset.classList.add("sunset");
rightInfo.appendChild(sunset);

const options = document.createElement("div");
options.classList.add("options");
screen.appendChild(options);

const celsius = document.createElement("div");
celsius.classList.add("celsius");
celsius.innerHTML = "<p>°C&nbsp</p>";
celsius.hidden = true;
options.appendChild(celsius);

const slash = document.createElement("div");
slash.classList.add("slash");
slash.innerHTML = "<p>/</p>";
slash.hidden = true;
options.appendChild(slash);

const fahrenheit = document.createElement("div");
fahrenheit.classList.add("fahrenheit");
fahrenheit.innerHTML = "<p>&nbsp°F</p>";
fahrenheit.hidden = true;
options.appendChild(fahrenheit);

const footer = document.createElement("footer");
const fname = document.createElement("div");
fname.innerText = "® 2023 JOSUE DE LOS SANTOS";
const fgithub = document.createElement("div");
const githubImage = new Image();
githubImage.setAttribute("title", "go to code");
githubImage.src = githubIcon;
const githubImageLink = document.createElement("a");
githubImageLink.setAttribute(
  "href",
  "https://github.com/JosueDeLosSantos/Weather-App"
);
githubImageLink.appendChild(githubImage);
fgithub.appendChild(githubImageLink);
footer.appendChild(fname);
footer.appendChild(fgithub);
body.appendChild(footer);

sbButton.addEventListener("click", weatherCheck);

function dispenser(object, option = "C") {
  if (!screen.classList.contains("day")) {
    screen.classList.add("day");
  }

  cityName.innerText = `${object.city}, ${object.country}`;
  daytime.innerText = `${object.date}`;
  description.innerText = `${object.description}`;

  if (option === "C") {
    temp.innerText = `${object.tempC}`;
    feelsLike.innerText = `Feels like ${object.feels_likeC}`;
  } else if (option === "F") {
    temp.innerText = `${object.tempF}`;
    feelsLike.innerText = `Feels like ${object.feels_likeF}`;
  }

  humidity.innerText = `Humidity: ${object.humidity}`;

  async function weatherIcon(value) {
    const iconFetch = await fetch(
      `https://openweathermap.org/img/wn/${value}@2x.png`,
      {
        mode: "cors",
      }
    );

    icon.src = iconFetch.url;
  }

  weatherIcon(object.icon);

  wind.innerText = `Wind: ${object.wind}`;
  sunrise.innerText = `sunrise: ${object.sunrise}`;
  sunset.innerText = `sunset: ${object.sunset}`;

  celsius.hidden = false;
  slash.hidden = false;
  fahrenheit.hidden = false;
}

let cardInfoHolder = null;

async function weatherCheck(e) {
  e.preventDefault();
  showSearch();

  let errorMessage = null;

  try {
    const wsearch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`,
      { mode: "cors" }
    );
    const wsdata = await wsearch.json();

    if (wsdata.message) {
      errorMessage = await wsdata.message;
    }

    const cardInfo = {
      city: wsdata.name,
      country: wsdata.sys.country,
      time: `${time.time(wsdata.dt)}`,
      date: `${time.currentDate(wsdata.dt)}`,
      description: wsdata.weather[0].description,
      tempC: `${Math.round(kelvinToCelsius(wsdata.main.temp))} °C`,
      tempF: `${Math.round(kelvinToFahrenheit(wsdata.main.temp))} °F`,
      feels_likeC: `${Math.round(kelvinToCelsius(wsdata.main.feels_like))} °C`,
      feels_likeF: `${Math.round(
        kelvinToFahrenheit(wsdata.main.feels_like)
      )} °F`,
      humidity: `${wsdata.main.humidity} %`,
      wind: `${Math.round(wsdata.wind.speed)} m/s`,
      pressure: `${wsdata.main.pressure} hPa`,
      sunrise: `${time.time(wsdata.sys.sunrise)}`,
      sunset: `${time.time(wsdata.sys.sunset)}`,
      icon: wsdata.weather[0].icon,
    };

    cardInfoHolder = cardInfo;

    if (fahrenheit.classList.contains("bold")) {
      fahrenheit.classList.remove("bold");
    }

    celsius.classList.add("bold");

    dispenser(cardInfo);
  } catch (error) {
    showSearch();
    showError(errorMessage);
  }
}

function tempSwitchC() {
  if (fahrenheit.classList.contains("bold")) {
    fahrenheit.classList.remove("bold");
    celsius.classList.add("bold");
    dispenser(cardInfoHolder, "C");
    return;
  }
}

function tempSwitchF() {
  if (celsius.classList.contains("bold")) {
    celsius.classList.remove("bold");
    fahrenheit.classList.add("bold");
    dispenser(cardInfoHolder, "F");
    return;
  }
}
celsius.onclick = tempSwitchC;
fahrenheit.onclick = tempSwitchF;

function showError(value) {
  if (screen.classList.contains("day")) {
    screen.classList.remove("day");
  }

  cityName.innerText = "";
  daytime.innerText = "";
  description.innerText = `${value}`;

  temp.innerText = "";
  feelsLike.innerText = "";

  temp.innerText = "";
  feelsLike.innerText = "";

  humidity.innerText = "";

  icon.src = warningIcon;

  wind.innerText = "";
  sunrise.innerText = "";
  sunset.innerText = "";

  celsius.hidden = true;
  slash.hidden = true;
  fahrenheit.hidden = true;
}

function showSearch() {
  if (screen.classList.contains("day")) {
    screen.classList.remove("day");
  }

  cityName.innerText = "";
  daytime.innerText = "";
  description.innerText = "";

  temp.innerText = "";
  feelsLike.innerText = "";

  temp.innerText = "";
  feelsLike.innerText = "";

  humidity.innerText = "";

  icon.src = searchIcon;

  wind.innerText = "";
  sunrise.innerText = "";
  sunset.innerText = "";

  celsius.hidden = true;
  slash.hidden = true;
  fahrenheit.hidden = true;
}

/* end */
