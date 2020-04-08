/*const dust1Icon = document.querySelector(".today_dust_icon1");
const dust2Icon = document.querySelector(".today_dust_icon2");
const URL = `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8`;


const httpRequest = new XMLHttpRequest();

function init(){
    httpRequest.addEventListener("readystatechange", getHTML, false);
    httpRequest.open('GET', URL);
    httpRequest.send();
}

function getHTML(){
    if(httpRequest.readyState === 4){
        if(httpRequest.status === 200){
            getDustInfo(httpRequest.responseText);
        }
    }
}

function getDustInfo(html){
    const div = document.createElement("div");
    div.innerHTML = html;
    const dust = div.querySelectorAll("dd>.num");
    const microDust = dust[0].innerHTML;
    const microDust2 = dust[1].innerHTML;

    console.log(microDust);
    printDust(microDust, microDust2);
}

function printDust(dust1, dust2){
    const dust1Int = parseInt(dust1.substr(0, dust1.length-3));
    const dust2Int = parseInt(dust2.substr(0, dust2.length-3));

    switch(true){
        case (dust1Int <= 30) : 
            dust1Icon.classList.add("far", "fa-grin-beam");
            break;
        case (dust1Int <= 80) : 
            dust1Icon.classList.add("far", "fa-meh", "normal");
            break;
        case (dust1Int <= 150) : 
            dust1Icon.classList.add("far", "fa-frown", "bad");
            break;
        default: 
            dust1Icon.classList.add("far", "fa-angry", "veryBad");
            break;
    }

    switch(true){
        case (dust2Int <= 15) : 
            dust2Icon.classList.add("far", "fa-grin-beam");
            break;
        case (dust2Int <= 35) : 
            dust2Icon.classList.add("far", "fa-meh", "normal");
            break;
        case (dust2Int <= 75) : 
            dust2Icon.classList.add("far", "fa-frown", "bad");
            break;
        default: 
            dust2Icon.classList.add("far", "fa-angry", "veryBad");
            break;
    }
}

init();
*/


const dust1P = document.querySelector(".dust1");
const dust2P = document.querySelector(".dust2");

function printDustInfo(dust1, dust2){
    const dust1Int = parseInt(dust1);
    const dust2Int = parseInt(dust2);
    const dustForm = document.querySelectorAll(".microdust");
    const dust1Icon = document.createElement("i");
    const dust2Icon = document.createElement("i");

    switch(true){
        case (dust1Int <= 30) : 
            dust1Icon.classList.add("far", "fa-grin-beam", "today_dust_icon1");
            break;
        case (dust1Int <= 80) : 
            dust1Icon.classList.add("far", "fa-meh", "today_dust_icon1", "normal");
            break;
        case (dust1Int <= 150) : 
            dust1Icon.classList.add("far", "fa-frown", "today_dust_icon1", "bad");
            break;
        default: 
            dust1Icon.classList.add("far", "fa-angry", "today_dust_icon1", "veryBad");
            break;
    }

    switch(true){
        case (dust2Int <= 30) : 
            dust2Icon.classList.add("far", "fa-grin-beam", "today_dust_icon1");
            break;
        case (dust2Int <= 80) : 
            dust2Icon.classList.add("far", "fa-meh", "today_dust_icon1", "normal");
            break;
        case (dust2Int <= 150) : 
            dust2Icon.classList.add("far", "fa-frown", "today_dust_icon1", "bad");
            break;
        default: 
            dust2Icon.classList.add("far", "fa-angry", "today_dust_icon1", "veryBad");
            break;
    }

    dustForm[0].appendChild(dust1Icon);
    dustForm[1].appendChild(dust2Icon);
}

//도시 이름으로 미세먼지 구하기
function getDustByCity(){
    fetch(
        `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${Service_KEY}&numOfRows=10&pageNo=1&stationName=%EB%8F%99%ED%83%84&dataTerm=DAILY&_returnType=json`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.list[0];
        printDustInfo(temp.pm10Value, temp.pm25Value);
    });
}
function init(){
    //loadCoords();

    getDustByCity();
}

init();