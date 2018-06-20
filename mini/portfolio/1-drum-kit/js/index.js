const removeTransition = (e) => {
  e.target.classList.remove('playing');
}

const pulse = (key) => {
  let letter = document.getElementsByClassName(`letter-${key}`);
  letter[0].classList.add('playing');
};

const makeNoise = (key) => {
  let audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    pulse(key);
  }
}

window.addEventListener("keydown", (e) => {

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  makeNoise(e.key);
});
