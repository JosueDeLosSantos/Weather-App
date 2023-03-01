import "./styles.css";
import * as time from "./time";

const body = document.querySelector("body");
// Form
const form = document.createElement("form");
// Search box
const searchBox = document.createElement("input");
searchBox.setAttribute("type", "search");
searchBox.setAttribute("placeholder", "Enter city name");
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

/* tests */

/* const sampleObject = {
  city: "Samaná",
  country: "DO",
  time: "1:56 PM",
  date: "Feb 28",
  description: "few clouds",
  tempC: "29 °C",
  tempF: "84 °F",
  feels_likeC: "34 °C",
  feels_likeF: "93 °F",
  humidity: "74 %",
  wind: "4 m/s",
  pressure: "1018 hPa",
  sunrise: "6:57 AM",
  sunset: "6:42 PM",
  icon: "02d",
}; */

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
celsius.classList.add("bold");
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

function dispenser(object, option = "C") {
  const space = ", ";
  cityName.innerText = `${object.city}, ${object.country}`;
  daytime.innerText = `${object.date}${space}${object.time}`;
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
      `http://openweathermap.org/img/wn/${value}@2x.png`,
      {
        mode: "cors",
      }
    );

    icon.src = iconFetch.url;

    console.log(iconFetch);
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

const weatherCheck = async (e) => {
  e.preventDefault();
  const wsearch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`
  );
  const wsdata = await wsearch.json();

  console.log(wsdata);

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

  cardInfoHolder = cardInfo;

  console.log(cardInfo);
  dispenser(cardInfo);
};

sbButton.addEventListener("click", weatherCheck);

const tempSwitch = () => {
  if (celsius.classList.contains("bold")) {
    celsius.classList.remove("bold");
    fahrenheit.classList.add("bold");
    dispenser(cardInfoHolder, "F");
  } else {
    fahrenheit.classList.remove("bold");
    celsius.classList.add("bold");
    dispenser(cardInfoHolder);
  }
};

celsius.onclick = tempSwitch;
fahrenheit.onclick = tempSwitch;
