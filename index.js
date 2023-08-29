let isDOBOpen = false;
let dateOfBirth=null;

const settingCogEl = document.getElementById("settingsIcon");
const settingContentEl = document.getElementById("settingsContent");

const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobInputEl = document.getElementById("dobInput");
const dobButtonEl = document.getElementById("dobButton");
const resetdobButtonEl = document.getElementById("resetdobButton");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (num)=>{
    return num > 9 ? num : `0${num}`;
}

const toggleDateOfBirthSelector = ()=>{
    if(isDOBOpen){
        settingContentEl.classList.add("hide");
    } else{
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
    // console.log("Toggle", isDOBOpen);
}

const updateAge = ()=>{
    const currentDate = new Date();
    // console.log(currentDate);
    const dateDiff = currentDate-dateOfBirth;
    // console.log(dateDiff);
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const remainingMilliseconds = dateDiff - year * (1000 * 60 * 60 * 24 * 365);
    const month = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24 * 30));
    const remainingMillisecondsAfterMonths = remainingMilliseconds - month * (1000 * 60 * 60 * 24 * 30);
    const day = Math.floor(remainingMillisecondsAfterMonths / (1000 * 60 * 60 * 24));
    const remainingMillisecondsAfterDays = remainingMillisecondsAfterMonths - day * (1000 * 60 * 60 * 24);
    const hour = Math.floor(remainingMillisecondsAfterDays / (1000 * 60 * 60));
    const remainingMillisecondsAfterHours = remainingMillisecondsAfterDays - hour * (1000 * 60 * 60);
    const minute = Math.floor(remainingMillisecondsAfterHours / (1000 * 60));
    const remainingMillisecondsAfterMinutes = remainingMillisecondsAfterHours - minute * (1000 * 60);
    const second = Math.floor(remainingMillisecondsAfterMinutes / 1000);
    // console.log(year, month, day, hour, minute, second);
    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(day);
    hourEl.innerHTML = makeTwoDigitNumber(hour);
    minuteEl.innerHTML = makeTwoDigitNumber(minute);
    secondEl.innerHTML = makeTwoDigitNumber(second);
}

const setDOBHandler = ()=>{
    const dateString = dobInputEl.value;
    if(dateString){
        dateOfBirth = new Date(dateString);
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("day", dateOfBirth.getDate());
    }
    window.location.reload();
}

const liveUpdate = ()=>{
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const day = localStorage.getItem("day");
    if(year && month && day){
        dateOfBirth = new Date(year, month, day);
    }
    if(dateOfBirth){
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("day", dateOfBirth.getDate());
        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide");
        resetdobButtonEl.classList.remove("hide");
        setInterval(()=> updateAge(), 1000)
    } else{
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
        resetdobButtonEl.classList.add("hide");
    }
}
liveUpdate();

const resetDOBHandler = ()=>{
    // localStorage.clear();
    localStorage.removeItem("year");
    localStorage.removeItem("month");
    localStorage.removeItem("day");
    dateOfBirth=null;
    liveUpdate();
}

settingCogEl.addEventListener("click", toggleDateOfBirthSelector)
dobButtonEl.addEventListener("click", setDOBHandler)
resetdobButtonEl.addEventListener("click", resetDOBHandler)