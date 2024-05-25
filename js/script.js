const apiKey = "60a59bb5891fc5ad6bd41fd0ce3f8265";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".input-group input");
const searchBtn = document.querySelector(".input-group button");
const tempIcon = document.querySelector(".temp-icon");

//if a user uses keyboard "Enter", it will work just like the Click
searchBtn.addEventListener("click", ()=>{
    getWeather(searchInput.value);
    } );
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      getWeather(searchInput.value);
    }
  });



async function getWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    //if the city name is not recognized, a message will be displayed
    if(response.status == 404){
        document.querySelector(".no-city").style.display = "block";
        document.querySelector(".current-data").style.display = "none";
    } else {
        let data = await response.json();

    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp-num').innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind-speed').innerHTML = data.wind.speed + " km/h";
    document.querySelector('.temp-icon').innerHTML = data.weather.main + " km/h";
    
//depending on the information of each city, the weather icon will change
    if (data.weather[0].main === "Clouds"){
        tempIcon.src = "assets/scatteredClouds.svg";
    }else if (data.weather[0].main === "Clear"){
        tempIcon.src = "assets/clear.svg";
    }else if (data.weather[0].main === "Rain"){
        tempIcon.src = "assets/rain.svg";
    }else if (data.weather[0].main === "Drizzle"){
        tempIcon.src = "assets/rainShowers.svg";
    }else if (data.weather[0].main === "Mist"){
        tempIcon.src = "assets/mist.svg";
    }
    //make first column hide at first, only appears when entering a city
    document.querySelector(".current-data").style.display = "block";
    //removes the "invalid city name" text if the city is correct
    document.querySelector(".no-city").style.display = "none";
}
    }
    
// searchBtn.addEventListener("click", ()=>{
//     getWeather(searchInput.value);
// } )
;




// function to get the current date
function updateDate() {
    const now = new Date();

    const dd = now.getDate(); 
    const mm = now.getMonth() + 1; 
    const yyyy = now.getFullYear(); 
    const newDate = dd + "-" + mm + "-" +yyyy; 

    document.querySelector('.date').textContent = newDate;
  }
  setInterval(updateDate, 1000);