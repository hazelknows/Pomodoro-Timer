let timer;
let timeLeft = 1500; // Default 25 min
let isRunning = false;

// Elements
const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const sessionInput = document.getElementById("session-time");
const breakInput = document.getElementById("break-time");

// Start Timer
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
});

// Pause Timer
pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});

// Reset Timer
resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = sessionInput.value * 60;
    updateTimeDisplay();
});

// Update Timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimeDisplay();
    } else {
        clearInterval(timer);
        isRunning = false;
        playAlarm();
    }
}

// Update Time Display
function updateTimeDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Play Custom Alarm Sound
function playAlarm() {
    let alarm = new Audio("your-alarm.mp3");
    alarm.play();
}

// Set Custom Time
sessionInput.addEventListener("change", () => {
    timeLeft = sessionInput.value * 60;
    updateTimeDisplay();
});

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">❌</button>`;
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

function removeTask(task) {
    task.parentElement.remove();
}

const audioPlayer = document.getElementById("audio-player");

// Fetch a playlist from Spotify
fetch("https://api.spotify.com/v1/playlists/YOUR_PLAYLIST_ID", {
    headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`
    }
})
.then(response => response.json())
.then(data => {
    let track = data.tracks.items[0].track.preview_url;
    if (track) {
        audioPlayer.src = track;
    }
});

