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

const wmain = {
  temp: 300.27,
  feels_like: 302.96,
  temp_min: 300.13,
  temp_max: 300.27,
  pressure: 1018,
  humidity: 78,
};

const wWeather = [
  {
    id: 801,
    main: "Clouds",
    description: "few clouds",
    icon: "02d",
  },
];

const wWind = {
  speed: 3.09,
  deg: 90,
};

const weatherCheck = async () => {
  /* const wsearch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=ce5151a53f837ffd535ab5be241f560c`
  );
  const wsdata = await wsearch.json();
  console.log(wsdata.main);
  console.log(wsdata.weather);
  console.log(wsdata.wind); */
  screen.innerText = wWind.speed;
};

sbButton.addEventListener("click", weatherCheck);
