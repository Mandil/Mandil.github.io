const secondsHand = document.querySelector('.seconds');
const minutesHand = document.querySelector('.minutes');
const hoursHand = document.querySelector('.hours');

const checkTime = () => {
  const now = new Date(Date.now());

  const seconds = now.getSeconds();
  const secondsDegree = ((seconds / 60) * 360) + 90;
  secondsHand.style.transform = `rotate(${secondsDegree}deg)`;

  const minutes = now.getMinutes();
  const minutesDegree = ((minutes / 60) * 360) + 90;
  minutesHand.style.transform = `rotate(${minutesDegree}deg)`;

  const hours = now.getHours();
  const hoursDegree = ((hours / 12) * 360) + 90;
  hoursHand.style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(checkTime, 1000);
