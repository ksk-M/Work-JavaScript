// グローバルスコープ　あらゆる場所からアクセス可能
const dial = document.getElementById("dial");
const startTimer = document.getElementById("start");
const stopTimer = document.getElementById("stop");
const resetTimer = document.getElementById("reset");

let interrupt = null;
let elapsedMs = null;
let holdTimes = 0;
// グローバルスコープ

startTimer.addEventListener("click",function(){
    let startMs = Date.now();

    startTimer.disabled = true;
    stopTimer.disabled = false;
    resetTimer.disabled = false;

    interrupt = setInterval(function(){
        const currentMs = Date.now();
        elapsedMs = currentMs - startMs + holdTimes;

        const ms = Math.floor(elapsedMs/100) % 10;
        const s = Math.floor(elapsedMs / 1000) % 60;
        const m = Math.floor(elapsedMs / 1000 / 60) % 60;
        const h = Math.floor(elapsedMs / 1000 / 60 / 60) % 60;

        const formattedMs = ms.toString();
        const formattedS = s.toString().padStart(2,'0');
        const formattedM = m.toString();
        const formattedH = h.toString();

        dial.textContent = `${formattedH} : ${formattedM} : ${formattedS} : ${formattedMs}`;
    },100);
});

stopTimer.addEventListener("click",function(){
    clearInterval(interrupt);
    holdTimes = elapsedMs;

    startTimer.disabled = false;
    stopTimer.disabled = true;
});

resetTimer.addEventListener("click",function(){
    clearInterval(interrupt);
    holdTimes = 0;
    dial.textContent = "0 : 0 : 00 : 0";

    startTimer.disabled = false;
    stopTimer.disabled = true;
    resetTimer.disabled = true;    
});