var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-search-term");
var listEl = document.querySelector(".list-group");
var fiveDayEl= document.querySelector("#fiveDay");

// api key
const myKey = "19c8ff289c37224bc84974fe7d88ee33";


var formSubmit = function(event) {
    event.preventDefault();

    // get value from input
    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
        cityInputEl.value = "";

        var cityListEl = document.createElement("li");
        cityListEl.classList = "list-group-item mt-2";

        var cityTitleEl = document.createElement("span");
        cityTitleEl.textContent = city;

        cityListEl.appendChild(cityTitleEl);

        listEl.appendChild(cityListEl);
    } else {
        alert ("Please enter a City");
    }
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
    // console.log(weather);
    weatherEl.textContent = "";

    // format date
    var date = new Date(weather['dt'] * 1000).toLocaleDateString("en-US");

    // icon
    var icon = weather['weather'][0]['icon'];

    // 
    cityNameEl.innerHTML = searchTerm + " " + date;

    
    // format data
    var temp = weather['main']['temp'];
    var humidity = weather['main']['humidity'];
    var wind = weather['wind']['speed'];
    
    // display temp wind humidity 
    var tempDisplay = document.createElement("p");
    // tempDisplay.classList = "list-item";
    tempDisplay.textContent = "Temp: " + temp + "F";

    var humidityDisplay = document.createElement("p");
    //humidityDisplay.classList = "list-item";
    humidityDisplay.textContent = "Humidity: " + humidity + "%";

    var windDisplay = document.createElement("p");
    // windDisplay.classList = "list-item";
    windDisplay.textContent = "Wind: " + wind + "MPH";

    weatherEl.appendChild(tempDisplay);
    weatherEl.appendChild(humidityDisplay);
    weatherEl.appendChild(windDisplay);

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + weather['coord']['lat'] + "&lon=" + weather['coord']['lon'] + "&appid=" + myKey + "&units=imperial";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var uv = document.createElement("p");
            uv.textContent = "UV Index:" + " " + data['current']['uvi'];
            weatherEl.appendChild(uv);

            // console.log(data);
            
            for (var i = 1; i < data['daily'].length - 2; i++) {
                var fiveDayCard = document.createElement("div");
                fiveDayCard.classList = "card bg-info";
                

                var fiveDay = data['daily'][i]['dt'];
                var fiveDayDate = new Date(fiveDay * 1000).toLocaleDateString("en-US");
                
                var fiveDayTemp = data['daily'][i]['temp']['max'];
                var fiveDayWind = data['daily'][i]['wind_speed'];
                var fiveDayHumid = data['daily'][i]['humidity'];

                fiveDayCard.textContent = (fiveDayDate +  "Temp: " + fiveDayTemp + "Wind: " + fiveDayWind + "MPH" +  "Humidity: " + fiveDayHumid + "%");
                
                fiveDayEl.appendChild(fiveDayCard);
            }
        })
    })
}

userFormEl.addEventListener("submit", formSubmit);

// search for a city and presented with current and future conditions
// city gets added to search history
// preseted with city name, date, icon, temp, humidity, wind speed and uv index
// uv index color coded favorable green, moderate orange, severe red
// 5 day forcast temp, wind, humidity
// displays date, icon, temp, wind speed, humidity
// click on city in search history again presented with same stats