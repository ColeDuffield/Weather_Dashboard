const api = {
    key: "be060e789de935c6a3c096fa90e75bda"
    baseurl: "https://api.openweathermap.org/data/2.5/"
    // http://maps.openweathermap.org/maps/2.0/weather/{PR0}/{0}/{38.953617}/{-94.733574}&appid={be060e789de935c6a3c096fa90e75bda} 
}

cost searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
       // console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch('${api.base}weather?q=${query}&units=imperial&APPID=${api.key}')
    .then(weather => {
        return weather.json();
      }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = '${weather.name}, ${weather.sys.country}';

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = '${Math.round(weather.main.temp)}<span>°F</span>';

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let highlow = document.querySelector('.high-low');
    highlow.innerText = '${(Math.roundweather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F';
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return '${day} ${date} ${month} ${year}';
}