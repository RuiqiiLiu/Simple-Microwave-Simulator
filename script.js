// Internal state is used for logic, but is not displayed on screen.
let microwaveState = "idle";
let doorOpen = false;
let time = 0;
let countdown;
let finishTimeout;

const microwave = document.querySelector(".microwave");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const addTimeButton = document.getElementById("add-time");
const startButton = document.getElementById("start");
const clearButton = document.getElementById("clear");
const doorButton = document.getElementById("toggle-door");

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  timer.textContent = minutes + ":" + seconds;

  const cooking = microwaveState === "cooking";
  const finished = microwaveState === "finished";
  startButton.textContent = cooking ? "Stop" : "Start";
  doorButton.textContent = doorOpen ? "Close door" : "Open door";
  doorButton.setAttribute("aria-pressed", String(doorOpen));
  microwave.classList.toggle("cooking", cooking && !doorOpen);
  microwave.classList.toggle("open", doorOpen);
  microwave.classList.toggle("finished", finished);
  addTimeButton.disabled = cooking || finished || time >= 5970;
  startButton.disabled = finished;
  clearButton.disabled = cooking || finished;
  message.textContent = "";
}

// Add time before cooking or while paused (maximum 99:30).
addTimeButton.addEventListener("click", function () {
  if (microwaveState === "cooking" || microwaveState === "finished") return;
  time = Math.min(time + 30, 5970);
  if (microwaveState !== "paused") microwaveState = "ready";
  updateDisplay();
});

// One button: Start becomes Stop while cooking, then Start again.
startButton.addEventListener("click", function () {
  if (microwaveState === "finished") return;
  if (microwaveState === "cooking") {
    clearInterval(countdown);
    microwaveState = "paused";
    updateDisplay();
    return;
  }
  if (doorOpen) {
    message.textContent = "Close the door before starting.";
    return;
  }
  if (time === 0) {
    message.textContent = "Add cooking time first.";
    return;
  }
  microwaveState = "cooking";
  startCountdown();
  updateDisplay();
});

// Clear only works while idle, ready, or paused.
clearButton.addEventListener("click", function () {
  if (microwaveState === "cooking" || microwaveState === "finished") return;
  clearInterval(countdown);
  clearTimeout(finishTimeout);
  time = 0;
  microwaveState = "idle";
  updateDisplay();
});

// Opening the door pauses cooking; closing it never starts cooking.
doorButton.addEventListener("click", function () {
  doorOpen = !doorOpen;
  if (doorOpen && microwaveState === "cooking") {
    clearInterval(countdown);
    microwaveState = "paused";
  }
  updateDisplay();
});

function startCountdown() {
  clearInterval(countdown);
  countdown = setInterval(function () {
    if (microwaveState === "cooking" && !doorOpen) {
      time = Math.max(0, time - 1);
      if (time === 0) finishCooking();
      updateDisplay();
    }
  }, 1000);
}

// Flash the light three times, then return to idle automatically.
function finishCooking() {
  clearInterval(countdown);
  microwaveState = "finished";
  finishTimeout = setTimeout(function () {
    microwaveState = "idle";
    updateDisplay();
  }, 3000);
}

updateDisplay();
