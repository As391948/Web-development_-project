console.log("Welcome to Spotify");

// Initialize the Variable
let songIndex = 0;
let audioElement = new Audio('Audios/audio1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let currentSong = document.getElementById('currentSong');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: 'One Love', filePath: 'Audios/audio1.mp3', coverPath: 'Covers/cover1.jpg' },
    { songName: 'Love Me Like You Do', filePath: 'Audios/audio2.mp3', coverPath: 'Covers/cover2.jpg' },
    { songName: 'Gulabi Sadi', filePath: 'Audios/audio3.mp3', coverPath: 'Covers/cover3.jpg' },
    { songName: 'Tu Hai Kahan', filePath: 'Audios/audio4.mp3', coverPath: 'Covers/cover4.jpg' },
    { songName: 'Laare Choote', filePath: 'Audios/audio5.mp3', coverPath: 'Covers/cover5.jpg' },
    { songName: 'Soulmate', filePath: 'Audios/audio6.mp3', coverPath: 'Covers/cover6.jpg' }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById(`gif${songIndex}`).style.opacity = 1;
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        document.getElementById(`gif${songIndex}`).style.opacity = 0;
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
    Array.from(document.getElementsByClassName('gif')).forEach((element) => {
        element.style.opacity = 0;
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.src = `Audios/audio${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            document.getElementById(`gif${songIndex}`).style.opacity = 1;
            currentSong.innerText = songs[songIndex].songName;
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            document.getElementById(`gif${songIndex}`).style.opacity = 0;
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex >= 5) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `Audios/audio${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById(`gif${songIndex}`).style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    currentSong.innerText = songs[songIndex].songName;
});

document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex <= 0) {
        songIndex = 5;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `Audios/audio${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById(`gif${songIndex}`).style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    currentSong.innerText = songs[songIndex].songName;
});