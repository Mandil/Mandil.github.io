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

const playTimeEl = document.querySelector('#play-time');
const playDurationEl = document.querySelector('#duration');

const video = document.querySelector('video');
const playButton = document.querySelector('button[name="play"]');

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
  playButton.innerHTML = '❚❚';
}

const pause = () => {
  video.pause();
  playButton.innerHTML = '►';
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





playButton.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
