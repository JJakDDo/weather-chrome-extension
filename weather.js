const API_KEY = "";
const COORDS = "coords";
const CITY = "Hwaseong";

const todayForm = document.querySelector(".today_weather");
const forecastForm = document.querySelector(".forecast");

let forecastTemp = [];
let forecastWeather = [];
let currentTemp;
let currentWeather;

const weather_icon = {
    "Clear": "fa-sun",
    "Clouds": "fa-cloud",
    "Rain": "fa-cloud-showers-heavy",
    "Snow": "fa-snowflake"
};

function printCurrent(){
    const today_icon = todayForm.querySelector("i");
    todayForm.querySelector("p").innerText = `${currentTemp}°`;
    today_icon.classList.add(weather_icon[currentWeather]);
}

function printForecast(){
    for(let i=0;i<forecastTemp.length;i++){
        const li = document.createElement("li");
        const icon = document.createElement("i");
        const p = document.createElement("p");
        const pDay = document.createElement("p");

        icon.classList.add("fas", weather_icon[forecastWeather[i]], "today_weather_icon");
        p.innerText = `${forecastTemp[i]}°`;
        pDay.innerText = `${dayKor[(todayInt+i+1)%dayKor.length]}`;

        li.appendChild(pDay);
        li.appendChild(icon);
        li.appendChild(p);

        forecastForm.appendChild(li);
    }
}

//도시 이름으로 날씨 구하기
function getWeatherByCity(city){
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.list.filter((v, i) => (i+1) % 8 == 0 );
        
        temp.forEach(element => {
            forecastTemp.push(parseInt(element.main.temp));
            forecastWeather.push(element.weather[0].main);
        });
        printForecast();
    });

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        currentTemp = parseInt(json.main.temp);
        currentWeather = json.weather[0].main;
        printCurrent();
    });
}

/*경도 위도 구해서 해당 위치의 날씨 구하기
function getWeather(lat, long){
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.list.filter((v, i) => (i+1) % 8 == 0 );
        
        temp.forEach(element => {
            forecastTemp.push(parseInt(element.main.temp));
            forecastWeather.push(element.weather[0].main);
        });
        printForecast();
    });

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        currentTemp = parseInt(json.main.temp);
        currentWeather = json.weather[0].main;
        printCurrent();
    });
}

//크롬 확장프로그램은 다른 형식으로 local storage에 저장함(아직 구현안한 부분)
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access current location.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
*/
function init(){
    //loadCoords();

    getWeatherByCity(CITY);
}

init();