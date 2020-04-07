const today = document.querySelector(".today");

const dayKor = ['일', '월', '화', '수', '목', '금', '토'];
let todayInt = 0;

function getTodaysDate(){
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth();
    const date = todayDate.getDate();
    todayInt = todayDate.getDay();
    const day = dayKor[todayInt];

    today.innerText = `${year}년 ${month+1}월 ${date}일 ${day}요일`;
    
}

function init(){
    getTodaysDate();
}

init();