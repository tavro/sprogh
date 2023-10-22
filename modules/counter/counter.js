let currentDate = new Date();
let interval;
let paused = true;

const dateElement = document.getElementById('date');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const fastForwardBtn = document.getElementById('fastForwardBtn');

function updateDate() {
  currentDate.setDate(currentDate.getDate() + 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
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
