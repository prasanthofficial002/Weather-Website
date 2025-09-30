const apiKey = "55f24050a954c25a699f4f526c199f9a"; // <-- IMPORTANT: Paste your API key from OpenWeatherMap here.
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const detailsContainer = document.querySelector(".details");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".Wind");


/**
 * Fetches weather data from the API and updates the UI.
 * @param {string} city The name of the city to get weather for.
 */
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            alert("City not found. Please check the spelling and try again.");
            weatherContainer.style.display = "none";
            detailsContainer.style.display = "none";
            return;
        }

        if (!response.ok) {
            throw new Error(`An API error occurred: ${response.statusText}`);
        }

        const data = await response.json();

        // Update UI elements with fetched data
        tempElement.innerHTML = Math.round(data.main.temp) + "°c";
        cityElement.innerHTML = data.name;
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the weather condition
        // Assumes you have images in an 'images' folder
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "assetes/images.jpg";
                break;
            case "Clear":
                weatherIcon.src = "assetes/images.jpg";
                break;
            case "Rain":
                weatherIcon.src = "pngwing.com.png";
                break;
            case "Drizzle":
                weatherIcon.src = "assetes/wind.jpg";
                break;
            case "Mist":
                weatherIcon.src = "assetes/wind.jpg";
                break;
            default:
                weatherIcon.src = "images/clear.png";
        }

        // Display the weather information
        weatherContainer.style.display = "block";
        detailsContainer.style.display = "flex";

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert("An error occurred while fetching weather data. Please try again later.");
        weatherContainer.style.display = "none";
        detailsContainer.style.display = "none";
    }
}

function handleSearch() {
    if (apiKey === "YOUR_API_KEY_HERE" || apiKey === "") {
        alert("Please add your OpenWeatherMap API key to script.js");
        return;
    }

    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
}

// Event listener for the search button click
searchBtn.addEventListener("click", handleSearch);

// Event listener for pressing 'Enter' in the search input
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Initially hide the weather details. They will appear after a successful search.
// This is done in JS since the CSS file cannot be modified.
function initialize() {
    weatherContainer.style.display = "none";
    detailsContainer.style.display = "none";
}

initialize();