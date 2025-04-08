const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const api = "19ef64a8df8d97fd63edf9eb447fc79f";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${api}`);

  // Check if the response is valid
  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error p").innerText = "City not found or invalid.";
    return; // Early exit to prevent further execution
  }

  const data = await response.json();

  // Ensure that the required properties are present in the API response
  if (!data.main || !data.main.temp || !data.weather || !data.weather[0].main) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error p").innerText = "Invalid data received.";
    return;
  }

  // If data is valid, display weather information
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  // Set weather icon based on weather condition
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/sun.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rainy.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }

  // Show the weather data and hide the error
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
