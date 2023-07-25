 const audio = document.getElementById('audio');
 const playPauseBtn = document.getElementById('playPauseBtn');
 const backwardBtn = document.getElementById('backwardBtn');
 const forwardBtn = document.getElementById('forwardBtn');
 const songRange = document.getElementById('songRange');
 const albumArt = document.getElementById('albumArt');
 const songTitle = document.getElementById('songTitle');
 const artist = document.getElementById('artist');
 const currentTime = document.getElementById('currentTime');
 const duration = document.getElementById('duration');

 let isPlaying = false;

 const songs = [{
         title: 'Tere Bin Ho Na Sakega Gujara',
         artist: 'Vasundhara Das',
         albumArt: 'image/image01.jpg',
         src: 'audio/song 01.mp3'
     },
     {
         title: 'Jaise Mera Tu ',
         artist: 'Arijit Singh & Priya Saraiya',
         albumArt: 'image/image02.jpg',
         src: 'audio/song 02.mp3'
     },
     {
         title: 'Mast Magan',
         artist: 'Arijit Singh & Chinmayi Sripada',
         albumArt: 'image/image03.jpg',
         src: 'audio/song 03.mp3'
     },
     {
         title: 'Yaariyan',
         artist: 'Sunidhi Chauhan & Arijit Singh',
         albumArt: 'image/image04.jpg',
         src: 'audio/song 04.mp3'
     },
     {
         title: 'Aaj Dil Shayrana',
         artist: 'Arijit Singh',
         albumArt: 'image/image05.jpg',
         src: 'audio/song 05.mp3'
     }
 ];

 let currentSongIndex = 0;

 function loadSong() {
     songTitle.textContent = songs[currentSongIndex].title;
     artist.textContent = songs[currentSongIndex].artist;
     albumArt.src = songs[currentSongIndex].albumArt;
     audio.src = songs[currentSongIndex].src;
 }

 function togglePlayPause() {
     if (isPlaying) {
         audio.pause();
         playPauseBtn.textContent = 'Play';
     } else {
         audio.play();
         playPauseBtn.textContent = 'Pause';
     }
     isPlaying = !isPlaying;
 }

 function backward() {
     currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
     loadSong();
     audio.play();
     playPauseBtn.textContent = 'Pause';
 }

 function forward() {
     currentSongIndex = (currentSongIndex + 1) % songs.length;
     loadSong();
     audio.play();
     playPauseBtn.textContent = 'Pause';
 }

 function updateTime() {
     const { currentTime: currentTimeValue, duration: durationValue } = audio;
     const minutesCurrent = Math.floor(currentTimeValue / 60);
     const secondsCurrent = Math.floor(currentTimeValue % 60);
     const minutesDuration = Math.floor(durationValue / 60);
     const secondsDuration = Math.floor(durationValue % 60);
     currentTime.textContent = `${minutesCurrent}:${secondsCurrent < 10 ? '0' : ''}${secondsCurrent}`;
     duration.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' : ''}${secondsDuration}`;
     songRange.value = (currentTimeValue / durationValue) * 100;
 }

 loadSong();

 audio.addEventListener('ended', forward);
 songRange.addEventListener('input', () => {
     audio.currentTime = (songRange.value / 100) * audio.duration;
 });