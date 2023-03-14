// Get DOM elements
const taskNameInput = document.getElementById('task-name');
const taskDurationInput = document.getElementById('task-duration');
const addTaskButton = document.getElementById('add-task-btn');
const taskHistoryTable = document.getElementById('task-history');
const startTimerButton = document.getElementById('start-timer-btn');
const stopTimerButton = document.getElementById('stop-timer-btn');
const timerElement = document.getElementById('timer');

// Initialize task history array
let taskHistory = [];

// Handle form submission
function handleFormSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get task name and duration values from input fields
  const taskName = taskNameInput.value;
  const taskDuration = taskDurationInput.value;

  // Create new task object with current time as start time
  const newTask = {
    name: taskName,
    duration: taskDuration,
    startTime: Date.now(),
    endTime: null
  };

  // Add new task to task history array
  taskHistory.push(newTask);

  // Reset form input fields
  taskNameInput.value = '';
  taskDurationInput.value = '';

  // Render task history table
  renderTaskHistoryTable();
}

// Render task history table
function renderTaskHistoryTable() {
  // Clear existing table rows
  taskHistoryTable.innerHTML = '';

  // Create new table rows from task history array
  for (const task of taskHistory) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.duration}</td>
      <td>${new Date(task.startTime).toLocaleString()}</td>
      <td>${task.endTime ? new Date(task.endTime).toLocaleString() : ''}</td>
    `;
    taskHistoryTable.appendChild(newRow);
  }
}

// Handle timer tick
let timerIntervalId;
let remainingTime;
function handleTimerTick() {
  remainingTime -= 1000;
  if (remainingTime >= 0) {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
  } else {
    timerElement.textContent = '00:00';
    stopTimer();
  }
}

// Start timer
function startTimer(duration) {
  remainingTime = duration * 60 * 1000;
  timerIntervalId = setInterval(handleTimerTick, 1000);
}

// Stop timer
function stopTimer() {
  clearInterval(timerIntervalId);
  timerIntervalId = null;
  const lastTask = taskHistory[taskHistory.length - 1];
  lastTask.endTime = Date.now();
  renderTaskHistoryTable();
}

// Attach event listeners
addTaskButton.addEventListener('click', handleFormSubmit);
startTimerButton.addEventListener('click', () => startTimer(taskHistory[taskHistory.length - 1].duration));
stopTimerButton.addEventListener('click', stopTimer);
