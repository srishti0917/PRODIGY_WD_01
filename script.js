
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let timeDisplay = document.getElementById("time-display");
let lapList = document.getElementById("lap-list");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let running = false;
let timerInterval = null;
let laps = [];

function formatTime(ms, s, m) {
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}

function startStopwatch() {
  running = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false;

  timerInterval = setInterval(function() {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    timeDisplay.textContent = formatTime(milliseconds, seconds, minutes);
  }, 10); 
}

function pauseStopwatch() {
  running = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  running = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  timeDisplay.textContent = formatTime(milliseconds, seconds, minutes);
  lapList.innerHTML = ""; 
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
}

function recordLap() {
  let lapTime = formatTime(milliseconds, seconds, minutes);
  let li = document.createElement("li");
  li.textContent = `Lap: ${lapTime}`;
  lapList.appendChild(li);
}

startButton.addEventListener("click", () => {
  if (!running) {
    startStopwatch();
  }
});

pauseButton.addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
});

resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
