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

        // Create the delete button
        let deleteBtn = document.createElement("button");
        let img = document.createElement("img");

        // Set the image source (Replace with your actual image path)
        img.src = "assets/checkmark.png"; 
        img.alt = "Task Completed";
        img.style.width = "20px"; // Adjust size as needed
        img.style.height = "20px";

        // Append the image to the button
        deleteBtn.appendChild(img);
        deleteBtn.onclick = function () {
            removeTask(this);
        };

        // Append the task text and delete button to the list item
        li.innerHTML = `${taskInput.value} `;
        li.appendChild(deleteBtn);

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
const audio = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const albumArt = document.getElementById("album-art");

const playlist = [
    { 
        src: "assets/swanlake.mp3", 
        title: "Swan Lake (Act II, No. 10)", 
        artist: "Tchaikovsky", 
        art: "assets/song.png"
    },
    { 
        src: "assets/song2.mp3", 
        title: "Rainy Day", 
        artist: "Soft Piano", 
        art: "assets/song2.png"
    }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    audio.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
    trackArtist.textContent = playlist[index].artist;
    albumArt.src = playlist[index].art;
}

playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

document.getElementById("next").addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
});

document.getElementById("prev").addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
});

// Load first track on startup
loadTrack(currentTrackIndex);
