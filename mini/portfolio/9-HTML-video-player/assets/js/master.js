const toHHMMSS =  (totalSeconds) => {
    let sec_num = parseInt(totalSeconds, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

const progressBar = document.querySelector('#progress-bar');
const volumeBar = document.querySelector('#volume-bar');
const speedBar = document.querySelector('#speed-bar');
const speedLabel = document.querySelector('label[for="speed-bar"]');
const control = document.querySelector('.control');
const fastRewindBtn = document.querySelector('#fast_rewind');

const videoSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

const playTimeEl = document.querySelector('#play-time');
const playDurationEl = document.querySelector('#duration');

const video = document.querySelector('video');
const playButton = document.querySelector('button.play');

const currentTime = () => {
  playTimeEl.innerHTML = toHHMMSS(video.currentTime);
  const percentage = 100 * video.currentTime / video.duration;
  progressBar.value = percentage;
  progressBar.innerHTML = percentage + '% played';
}

video.addEventListener('timeupdate', currentTime);

video.ondurationchange = () => {
  playTimeEl.innerHTML = '00:00:00';
  playDurationEl.innerHTML = toHHMMSS(video.duration);
}

video.onloadeddata = ()=>{
  video.volume = 0.5;
  volumeBar.value = 0.5;
}

const play = () => {
  video.play();
  playButton.innerHTML = '<i class="material-icons">pause_circle_filled</i>';
}

const pause = () => {
  video.pause();
  playButton.innerHTML = '<i class="material-icons">play_circle_filled</i>';
}

const togglePlay = () => {
  video.paused ? play() : pause();
}

progressBar.addEventListener('click', (e) => {
  const percent = e.offsetX / progressBar.offsetWidth;
  video.currentTime = percent * video.duration;
})

volumeBar.addEventListener('click', (e) => {
  const percent = e.offsetX / volumeBar.offsetWidth;
  video.volume = percent ;
  volumeBar.value = percent;
})

video.addEventListener('mouseover', () => {
  console.log(control.style.display);
  control.style.display = 'block';
})

video.addEventListener('mouseout', () => {
  console.log(control.style.display);
  setTimeout(() => {
    if (control.style.display === 'block') {
      control.style.display = 'none';
    }
  }, 5000)
})

const fastRewind = () => {
  const currentSpeed = video.playbackRate;
  if (currentSpeed === 0.25) return;
  const nextSpeed = videoSpeeds[videoSpeeds.indexOf(currentSpeed) - 1];
  video.playbackRate = nextSpeed;
  console.log(nextSpeed);
}

// speedBar.addEventListener('click', (e) => {
//   const percent = 2 * e.offsetX / volumeBar.offsetWidth;
//   video.playbackRate = percent;
//   speedBar.value = percent;
//   speedLabel.innerHTML = percent + ' X'
// })

playButton.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
fastRewindBtn.addEventListener('click', fastRewind)
