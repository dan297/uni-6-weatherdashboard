//element from the DOM using JQuery
var savedCities = $(".savedCitiesSearch")
var search = $("#search")
var APIKey = "166a433c57516f51dfab1f7edaed8413";

//forecast to show next five day details
function FiveDayForcast() {
    //using ajax to retrieve information
    $.ajax({
        url: fiveDayForcast,
        method: "GET"
    }).then(function(response) {

        //for loop to loop throug each of the 5 forcast boxes
        var showDetails = -8
        for (var weatherInfo = 0; weatherInfo < 5; weatherInfo++) {

            showDetails = showDetails + 8
            var weather = response.list[showDetails].weather[0].description
            var tempInC = (response.list[showDetails].main.temp - 273.15);

            var dateTime = response.list[showDetails].dt_txt
            var humidity = response.list[showDetails].main.humidity

            var dateOnly = dateTime.split(" ")

            var forcast = document.querySelector(".fiveDayForcastGrid")
            forcast.children[weatherInfo].children[0].textContent = dateOnly[0]
            forcast.children[weatherInfo].children[1].textContent = "Condition: " + weather
            forcast.children[weatherInfo].children[2].textContent = "Tempreture in C: " + tempInC.toFixed(0)
            forcast.children[weatherInfo].children[3].textContent = "Humidity: " + humidity
        }
    });
}

function presentWeather() {

    $.ajax({
            //using ajax to fetch api info
        url: weatherAPI,
        method: "GET"
    }).then(function(response) {
    var windspeed = response.wind.speed
    var humidity = response.main.humidity
    var tempF = (response.main.temp - 273.15) 
    //used to fetch data from the  response to display on page
    lat = response.coord.lat
    lon = response.coord.lon


    //creating, amending and appending to add a list with weather information for the present day
    var weatherList = document.querySelector(".weatherList")
    weatherList.children[0].textContent = "Temperature in C: " + tempF.toFixed(0)
    weatherList.children[1].textContent = "Humidity: " + humidity.toFixed(0)
    weatherList.children[2].textContent = "Wind Speed: " + windspeed.toFixed(0)
    
    queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + 
    lat + "&lon=" + lon + "&appid=" + APIKey

//running previous function to display 5 day forcast
    FiveDayForcast()
  });
}

//using local storage to store city names
search.on("click", function() {
    for (var savedList = 8; savedList > 0; savedList--) {
        var previousDestination = $("#button" + (savedList-1)).text()
        $("#button" + savedList).text(previousDestination)
    }

    weatherDestination = $(".formText").val()
    var getLocalStorage = JSON.parse(localStorage.getItem("ECityArray"))
    getLocalStorage[0] = weatherDestination
    $("#button0").text(weatherDestination)

    for (var savedSearch  = 0; savedSearch < 8; savedSearch++) {
        getStorage[savedSearch] = $("#button"+savedSearch).text()
    }
    localStorage.setItem("ECityArray", JSON.stringify(getStorage))
    weatherAPI = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ weatherDestination + "&appid=" + APIKey;

    fiveDayForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
    weatherDestination + "&appid=" + APIKey

    presentWeather()
})

savedCities.on("click", function() {
    weatherDestination = $(this).text()

    weatherAPI = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ weatherDestination + "&appid=" + APIKey;

    fiveDayForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
    weatherDestination + "&appid=" + APIKey

    presentWeather()
})