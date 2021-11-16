var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-search-term");
var currentTemp = document.querySelector("#temp");
var listEl = document.querySelector(".list-group");

// api key
const myKey = "19c8ff289c37224bc84974fe7d88ee33";


var formSubmit = function(event) {
    event.preventDefault();

    // get value from input
    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
        cityInputEl.value = "";
    } else {
        alert ("Please enter a City");
    }

    var cityListEl = document.createElement("li");
    cityListEl.classList = "list-item";

    var cityTitleEl = document.createElement("span");
    cityTitleEl.textContent = city;

    cityListEl.appendChild(cityTitleEl);

    listEl.appendChild(cityListEl);
    
}

var getWeather = function(cityName) {
    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + myKey;

    // make request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        })
    })
}

var displayWeather = function(weather, searchTerm) {
    console.log(weather);
    cityNameEl.innerHTML = searchTerm;
    // format data
    var temp = weather['main']['temp'];
    var humidity = weather['main']['humidity'];
    var wind = weather['wind']['speed'];
    
    //create 
    
}


userFormEl.addEventListener("submit", formSubmit);

// search for a city and presented with current and future conditions
// city gets added to search history
// preseted with city name, date, icon, temp, humidity, wind speed and uv index
// uv index color coded favorable green, moderate orange, severe red
// 5 day forcast
// displays date, icon, temp, wind speed, humidity
// click on city in search history again presented with same stats