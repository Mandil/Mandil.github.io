const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX, lastY;
let hue = 1;
let upDirection = true;

const updateXY = (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

const draw = (e) => {
  if (!isDrawing) return;
  ctx.lineWidth = hue/4;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  updateXY(e);
  if (hue >= 360 || hue <= 0) {
    upDirection = !upDirection;
  }
  upDirection ? ++hue : --hue;
}


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  updateXY(e);
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
