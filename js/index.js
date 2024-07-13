var search = document.getElementById('search');
var submit = document.getElementById('submit');


async function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3fe1abc59a2f490885b72127240201&q=${lat},${long}&days=3`);
            var response = await data.json();
            displayCurrentWeather(response);
            displayNextDayWeather(response);
            displayDay3(response);
        });
    }
}

document.addEventListener('DOMContentLoaded', getGeoLocation);

async function findLocation() {
    var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3fe1abc59a2f490885b72127240201&q=${search.value}&days=3`);
    var response = await data.json();
    console.log(response);
    displayCurrentWeather(response);
    displayNextDayWeather(response);
    displayDay3(response);
}

document.addEventListener('keyup', findLocation);
submit.addEventListener('click', findLocation);

function displayCurrentWeather(data) {
    var cartona = ``;
    cartona += `<div class="card rounded-0 card-1 border-0">
                    <div class="card-header d-flex justify-content-between rounded-end-0 border-0">
                        <div class="day">${getDayOfWeek(data.location.localtime)}</div>
                        <div class="date">${formatDate(data.location.localtime)}</div>
                    </div>
                    <div class="card-body">
                        <div class="city">${data.location.name}</div>
                        <div class="temp d-flex justify-content-start align-items-center">
                            <div class="celsius">
                                ${data.current.temp_c}<sup>o</sup>C
                            </div>
                            
                        </div>
                        <div class="weather-status">${data.current.condition.text}</div>
                        <span class="text-white">
                            <i class="fa-solid fa-cloud-rain"></i>
                            20%
                        </span>
                        <span class="text-white">
                            <i class="fa-solid fa-wind"></i>
                            18km/h
                        </span>
                        <span class="text-white">
                            <i class="fa-solid fa-compass"></i>
                            East
                        </span>
                    </div>
                </div>`;
    document.getElementById('currentWeather').innerHTML = cartona;
}

function displayNextDayWeather(data) {
    var forecastDay = data.forecast.forecastday[1];
    console.log(forecastDay);
    var cartona = ``;
    cartona += `<div class="card rounded-0 card-2 border-0 text-center">
                    <div class="card-header rounded-0 border-0">
                        <div class="day">${getDayOfWeek(forecastDay.date)}</div>
                    </div>
                    <div class="card-body">
                         
                        <div class="degree text-white">${forecastDay.day.maxtemp_c}<sup>o</sup>C</div>
                        <small>${forecastDay.day.mintemp_c}<sup>o</sup></small>
                        <div class="weather-status">${forecastDay.day.condition.text}</div>
                    </div>
                </div>`;
    document.getElementById('nextDay').innerHTML = cartona;
}

function displayDay3(data) {
    var forecastDay = data.forecast.forecastday[2];
    console.log(forecastDay);
    var cartona = ``;
    cartona += `<div class="card rounded-0 card-3 border-0 text-center">
                    <div class="card-header rounded-0 border-0">
                        <div class="day">${getDayOfWeek(forecastDay.date)}</div>
                    </div>
                    <div class="card-body">
                        
                        <div class="degree text-white">${forecastDay.day.maxtemp_c}<sup>o</sup>C</div>
                        <small>${forecastDay.day.mintemp_c}<sup>o</sup></small>
                        <div class="weather-status">${forecastDay.day.condition.text}</div>
                    </div>
                </div>`
    document.getElementById('Day3').innerHTML = cartona;
}


function formatDate(inputDate) {
    var parsedDate = new Date(inputDate);
    var day = parsedDate.getDate();
    var month = parsedDate.toLocaleDateString('en-US', { month: 'long' });
    return `${day}${month}`;
}

function getDayOfWeek(inputDate) {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var parsedDate = new Date(inputDate);
    var dayOfWeek = parsedDate.getDay();
    return daysOfWeek[dayOfWeek];
}








