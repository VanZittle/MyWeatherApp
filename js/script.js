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

const renderData = function(dataObj){
    const dataList = dataObj.list;
    console.log(dataList);
    let i = 2;
    for (let index = 8; index < dataList.length; index+=8) {
        const weatherObject = dataList[index];
        console.log(dataList[index]); 
        const forecastCard = `
            <div class="col mb-3 mb-sm-0">
                <div class="card">
                    <div class="card-body">
                        <h5 class="day card-title">Day ${i}</h5>
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
    // document.querySelector(".current-data").style.display = "block";
    // //removes the "invalid city name" text if the city is correct
    // document.querySelector(".no-city").style.display = "none";
}

const getWeather = function (city){
    const url = apiUrl + city + `&appid=${apiKey}`;

    fetch(url)
    .then (function(data){return data.json()})
    .then (function(obj){renderData(obj)})
    .catch (function(err){console.log(err)
        // if the city name is not recognized, a message will be displayed
    document.querySelector(".no-city").style.display = "block";
    document.querySelector(".current-data").style.display = "none";
    searchInput.value = '';

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