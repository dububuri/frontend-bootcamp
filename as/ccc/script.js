const powerbtn = document.querySelector(".power");
const clockJ = document.querySelector(".clock");
const dateJ = document.querySelector(".date");
const timeJ = document.querySelector(".time");
const batteryImg = document.querySelector(".battery-img");
const batteryText = document.querySelector(".battery-text");
const alarmH = document.querySelector(".alarm-hour");
const alarmM = document.querySelector(".alarm-minute");
const alarmS = document.querySelector(".alarm-second");
const alarmAdd = document.querySelector(".alarm-add");
const alarmList = document.querySelector(".alarm-list");


//시간
function updateClock(){
    const nowdate = new Date();
    const yyyy = nowdate.getFullYear();
    const mm = String(nowdate.getMonth()+1).padStart(2, '0');
    const dd = String(nowdate.getDate()).padStart(2,'0');
    const hh = String(nowdate.getHours()).padStart(2,'0');
    const min = String(nowdate.getMinutes()).padStart(2,'0');
    const ss = String(nowdate.getSeconds()).padStart(2,'0');

    dateJ.textContent = `${yyyy}-${mm}-${dd}`;
    timeJ.textContent = `${hh}:${min}:${ss}`;
    const currentTime = `${hh}:${min}:${ss}`;

    //알림 기능
    if (alarms.includes(currentTime)) {
        alert("알림 시간: " + currentTime);
        //울린 알림 제거
        alarms = alarms.filter(function (alarm) {
            return alarm !== currentTime;
        });

        updateAlarmList();
    }
}


//배터리
let nowbattery = 100;

function updateBattery(){
    if (nowbattery > 0){
        nowbattery = nowbattery - 1;
        batteryText.textContent = `${nowbattery}%`;
    }
    let imgsrc = "assets/images/battery100.png";
    if (nowbattery > 80){
            imgsrc = "assets/images/battery100.png";
        } else if (nowbattery > 50){
            imgsrc = "assets/images/battery80.png";
        } else if (nowbattery > 30){
            imgsrc = "assets/images/battery50.png";
        } else if (nowbattery > 10){
            imgsrc = "assets/images/battery30.png";
        } else{
            imgsrc = "assets/images/battery10.png";
        }
    
        batteryImg.src = imgsrc;

    if(nowbattery <= 0) {
        clockJ.style.backgroundColor = 'black';
        dateJ.style.color = 'black';
        timeJ.style.color = 'black';
        batteryText.textContent = '0%';
    }
}


//알림
let alarms = [];

//알람 목록 화면에 출력하는 함수
function updateAlarmList(){
    const alarmtext = [
        document.querySelector(".first-alarm"),
        document.querySelector(".second-alarm"),
        document.querySelector(".third-alarm")
    ];
    for (let i = 0; i < 3; i++) {
        if (alarms[i]) {
            alarmtext[i].textContent = "알림: "+ alarms[i];
        } else {
            alarmtext[i].textContent = "";
        }
    }
}

//알람 추가 버튼 
alarmAdd.addEventListener("click", function (){
    let hour = parseInt(alarmH.value); //입력값 문자열을 정수로 변환하여 가져옴
    let minute = parseInt(alarmM.value);
    let second = parseInt(alarmS.value);

    //updateAlarmlist에서 제한은 했고 알림만
    if (alarms.length >= 3) {
        alert("알람은 최대 3개까지 설정할 수 있습니다.");
        return;
    }

    //중복일 경우
    if (alarms.includes(String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" +String(second).padStart(2, "0"))){
        alert("이미 등록된 알람입니다.");
        return;
    }

    //알림 추가
    alarms.push(String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" +String(second).padStart(2, "0"));
    updateAlarmList();

    //입력칸 다시 초기화
    alarmH.value = "";
    alarmM.value = "";
    alarmS.value = "";
});


//전원 버튼
let powerOn = false;
let clockIntervalId;
let batteryIntervalId;

function togglePower(){
    if (powerOn) { //전원 끄기
        clockJ.style.backgroundColor = "black";
        dateJ.style.color = "black";
        timeJ.style.color = "black";
        batteryImg.style.display = "none";
        batteryText.textContent = "0%";
        alarmH.disabled = true;
        alarmM.disabled = true;
        alarmS.disabled = true;
        alarmAdd.disabled = true;
        alarmList.style.display = "none";

        clearInterval(clockIntervalId);
        clearInterval(batteryIntervalId);
        powerOn = false;
    } else { //전원 켜기
        clockJ.style.backgroundColor = "";
        dateJ.style.color = "#9e9ac8";
        timeJ.style.color = "#6a51a3";
        nowbattery = 100;
        batteryText.textContent = "100%";
        batteryImg.src = "assets/images/battery100.png";
        batteryImg.style.display = "inline";
        alarmList.style.display = "block";
        alarmH.disabled = false;
        alarmM.disabled = false;
        alarmS.disabled = false;
        alarmAdd.disabled = false;

        clockIntervalId = setInterval(updateClock, 1000);
        batteryIntervalId = setInterval(updateBattery, 1000);
        powerOn = true;
    }
}

powerbtn.addEventListener("click", togglePower);