const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".city-input");

const card = document.querySelector(".card");
const apiKey = "e514e0947f7170b6d91720ebd40cc942";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else {
        console.log("Not found");
        displayError("Please Enter a city!");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");

    }
    return await response.json();

}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city, 
            main: { temp, humidity }, 
            weather: [{ description, id }] } = data;
    card.textContent="";
    card.style.display="flex";
        // card.classList.remove("style");
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");
    
    cityDisplay.innerText=city;
    tempDisplay.innerText=`${((temp-273.15)).toFixed(1)}°C`;
    humidityDisplay.innerText=`Hummidity : ${humidity}`;
    descDisplay.innerText=`${description}`;
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    // card.appendChild(weatherEmoji);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}



