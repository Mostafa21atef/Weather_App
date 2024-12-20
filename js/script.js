var today=document.querySelector(".today");
var btnFind = document.querySelector(".find");
var searchInput=document.querySelector(".search");
var form = document.querySelector("form");
var forecast=document.querySelector(".forecast");
var row=document.getElementById("row");

form.addEventListener("submit",function(e){
    e.preventDefault();
})

var city;
var current;
var forecast;

getWeather("cairo");

async function getWeather(term){
    
    var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bb976640a76b468e941174424241112&q=${term}&days=7`);
    var data = await res.json();
    
    if(res.status>=200&&res.status<300){
       city=data.location;
       current=data.current;
       forecast=data.forecast.forecastday;
    }
    console.log(forecast);
    
    displayCurrent(city,current);
    displayForecast(forecast);

    console.log(data);
}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    

btnFind.addEventListener("click",function(){
    getWeather(searchInput.value);
})

function displayCurrent(l,curr){
    var e = new Date(l.localtime.replace(" ", "T"));
        
    let current = ` <div class="myCurrent mt-3 rounded-4 mb-4">
                       <div class="current-header rounded-top-4 d-flex justify-content-between align-items-center">
                         <h1 class="h5 text-white text-opacity-75 ps-3">${days[e.getDay()]}</h1>
                         <h2 class="h6 text-white text-opacity-75 pe-3">${e.getMonth()} ${monthNames[e.getMonth()]}</h2>
                       </div>
                       <div class="current-content d-flex justify-content-center flex-column">
                          <h2 class="today-city  mt-3 text-white fw-bold">${l.name}</h1>
                          <h1 class=" mt-3 temp text-white">${curr.temp_c}°C</h1>
                          <h2 class="mt-3 text-white h5 text-opacity-75">${curr.condition.text}<img src="https:${curr.condition.icon}" ></h2>
                          <div class="mt-4">
                          <span class="humidity  pe-2 text-white text-opacity-75"><i class="fa-solid fa-water"></i> ${curr.humidity}%</span>
                          <span class="wind-speed pe-2  text-white text-opacity-75"><i class="fa-solid fa-wind"></i> ${curr.wind_kph}km/h</span>
                          <span class="wind-dir text-white text-opacity-75"><i class="fa-regular fa-compass"></i> ${curr.wind_dir}</span>
                          </div>
                          
                       </div>
                    </div>
                  `
    
                  today.innerHTML=current;
}

