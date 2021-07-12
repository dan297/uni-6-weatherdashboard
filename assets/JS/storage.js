for (var i = 0; i < savedCities.length; i = 1+i) {
    var destinationStorage = JSON.parse(localStorage.getItem("ECityArray"))
    $("#button" + i).text(destinationStorage[i])
}

search.on("click", function() {
    for (var savedList = 8; savedList > 0; savedList--) {
        var previousDestination = $("#button" + (savedList-1)).text()
        $("#button" + savedList).text(previousDestination)
    }

    for (var savedSearch  = 0; savedSearch < 8; savedSearch++) {
        getLocalStorage[savedSearch] = $("#button"+savedSearch).text().trim()
    }

    weatherDestination = $(".formText").val()
    var getLocalStorage = JSON.parse(localStorage.getItem("ECityArray"))
    getLocalStorage[0] = weatherDestination
    $("#button0").text(weatherDestination)

    
    localStorage.setItem("ECityArray", JSON.stringify(getLocalStorage))
    weatherAPI = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ weatherDestination + "&appid=" + APIKey;

    fiveDayForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
    weatherDestination + "&appid=" + APIKey

    presentWeather()
})

