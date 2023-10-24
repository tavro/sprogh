let currentYear = 0;
let currentMonth = 0;
let currentDay = 1;
let interval;
let paused = true;

const dateElement = document.getElementById('date');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const fastForwardBtn = document.getElementById('fastForwardBtn');

function updateDate() {
  currentDay++;
  if (currentDay > 31) {
    currentDay = 1;
    showNotification("A month just passed!");
    currentMonth++;
    if (currentMonth > 11) {
        showNotification("A year just passed!");
        currentMonth = 0;
      currentYear++;
    }
  }
  const year = currentYear;
  const month = String(currentMonth + 1).padStart(2, '0');
  const day = String(currentDay).padStart(2, '0');
  dateElement.textContent = `${year}-${month}-${day}`;
}

startBtn.addEventListener('click', () => {
  if (paused) {
    interval = setInterval(updateDate, 1000);
    paused = false;
  }
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  fastForwardBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
  paused = true;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  fastForwardBtn.disabled = true;
});

fastForwardBtn.addEventListener('click', () => {
  updateDate();
});

updateDate();
