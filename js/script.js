const apiKey = "60a59bb5891fc5ad6bd41fd0ce3f8265";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".input-group input");
const searchBtn = document.querySelector(".input-group button");
const tempIcon = document.querySelector(".temp-icon");


async function getWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp-num').innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind-speed').innerHTML = data.wind.speed + " km/h";
    document.querySelector('.temp-icon').innerHTML = data.weather.main + " km/h";

    if (data.weather[0].main === "Clouds"){
        tempIcon.src = "assets/scatteredClouds.svg";
    }else if (data.weather[0].main === "Clear"){
        tempIcon.src = "assets/clear.svg";
    }else if (data.weather[0].main === "Rain"){
        tempIcon.src = "assets/rain.svg";
    }else if (data.weather[0].main === "Drizzle"){
        tempIcon.src = "assets/rainShowers.svg";
    }else if (data.weather[0].main === "Mist"){
        tempIcon.src = "assets/mist.svg";}
}
searchBtn.addEventListener("click", ()=>{
    getWeather(searchInput.value);
} );

// create a function to update the date and time
function updateDate() {
    const now = new Date();
    // const currentDate = now.toLocaleString();

    var dd = now.getDate(); 
    var mm = now.getMonth() + 1; 
    var yyyy = now.getFullYear(); 
    var newDate = dd + "-" + mm + "-" +yyyy; 

    document.querySelector('.date').textContent = newDate;
  }

  setInterval(updateDate, 1000);