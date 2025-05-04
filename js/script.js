const apiKey = "60a59bb5891fc5ad6bd41fd0ce3f8265";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchInput = document.querySelector(".input-group input");
const searchBtn = document.querySelector(".input-group button");
const tempIcon = document.querySelector(".temp-icon");
const forecastDiv = document.querySelector("#forecast-div");

//if a user uses keyboard "Enter", it will work just like the Click
searchBtn.addEventListener("click", ()=>{
    getWeather(searchInput.value);
    } );
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      getWeather(searchInput.value);
    }
  });
// day names
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const renderData = function(dataObj){
    const dataList = dataObj.list;
    console.log(dataList);
    let i = 2;
    // Clear previous forecast
    forecastDiv.innerHTML = ""; 
    for (let index = 8; index < dataList.length; index+=8) {
        const weatherObject = dataList[index];
        console.log(dataList[index]); 

        // Calculate the day name
        const date = new Date(weatherObject.dt_txt);
        const dayName = dayNames[date.getDay()];

        const forecastCard = `
            <div class="col mb-3 mb-sm-0">
                <div class="card">
                    <div class="card-body">
                        <h5 class="day card-title">${dayName}</h5>
                        <img src="https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png" alt="weather icon" class="temp-icon-3 my-2">
                        <h5 class="temp-num card-text">${weatherObject.main.temp}°c</h5>
                        <p class="card-text"><i class="fa-solid fa-droplet"></i><span class="humidity"> ${weatherObject.main.humidity}</span>%</p>
                        <p class="card-text"><i class="fa-solid fa-wind"></i><span class="wind-speed"> ${weatherObject.wind.speed}</span>km/h</p>
                    </div>
                </div>
            </div>`; 

        forecastDiv.innerHTML += forecastCard;
        i++;
    }

    document.querySelector('.city-name').innerHTML = dataObj.city.name;
    document.querySelector('.temp-num').innerHTML = Math.round(dataList[0].main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = dataList[0].main.humidity + "%";
    document.querySelector('.wind-speed').innerHTML = dataList[0].wind.speed + " km/h";
    document.querySelector('.temp-icon').innerHTML = dataList[0].weather.main + " km/h";
//depending on the information of each city, the weather icon will change
tempIcon.src = `https://openweathermap.org/img/wn/${dataList[0].weather[0].icon}@2x.png`;
    // if (dataList[0].weather[0].main === "Clouds"){
    // }else if (dataList[0].weather[0].main === "Clear"){
    //     tempIcon.src = "assets/clear.svg";
    // }else if (dataList[0].weather[0].main === "Rain"){
    //     tempIcon.src = "assets/rain.svg";
    // }else if (dataList[0].weather[0].main === "Drizzle"){
    //     tempIcon.src = "assets/rainShowers.svg";
    // }else if (dataList[0].weather[0].main === "Mist"){
    //     tempIcon.src = "assets/mist.svg";
    // }
    //make first column hide at first, only appears when entering a city
    const currentData = document.querySelector(".current-data");

    // Cleans any prev class if there was a prev intent
    currentData.classList.remove("show");

    // pushes the display so it is active, but invisible at first
    currentData.style.display = "block";

    // small delay so animation is activated
    setTimeout(() => {
    currentData.classList.add("show");
    }, 50);

    // //removes the "invalid city name" text if the city is correct
    document.querySelector(".no-city").style.display = "none";
    
    // removes the aligned center once a result is in
    document.getElementById("main-row").classList.remove("search-only");
}

const getWeather = function (city){
    const url = apiUrl + city + `&appid=${apiKey}`;

    fetch(url)
    .then (function(data){return data.json()})
    .then (function(obj){renderData(obj);
        searchInput.value = '';
    })
    .catch (function(err){console.log(err)
        // if the city name is not recognized, a message will be displayed
    document.querySelector(".no-city").style.display = "block";
    document.querySelector(".current-data").style.display = "none";
    })
    
}  
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