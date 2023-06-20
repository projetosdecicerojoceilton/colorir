const canvas = document.getElementById('drawing-area');
const context = canvas.getContext('2d');

let isPainting = false;
let previousX = 0;
let previousY = 0;

context.strokeStyle = '#ff0000';

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mousemove', paint);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseout', stopPainting);

canvas.addEventListener('touchstart', startPainting);
canvas.addEventListener('touchmove', paint);
canvas.addEventListener('touchend', stopPainting);
canvas.addEventListener('touchcancel', stopPainting);

function startPainting(event) {
  isPainting = true;
  updatePosition(event);
}

function paint(event) {
  if (!isPainting) return;

  let currentX, currentY;

  if (event.type === 'mousemove') {
    currentX = event.offsetX;
    currentY = event.offsetY;
  } else if (event.type === 'touchmove') {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    currentX = touch.clientX - rect.left;
    currentY = touch.clientY - rect.top;
  }

  context.beginPath();
  context.moveTo(previousX, previousY);
  context.lineTo(currentX, currentY);
  context.stroke();

  updatePosition(event);
}

function stopPainting() {
  isPainting = false;
}

function updatePosition(event) {
  let currentX, currentY;

  if (event.type === 'mousemove') {
    currentX = event.offsetX;
    currentY = event.offsetY;
  } else if (event.type === 'touchmove') {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    currentX = touch.clientX - rect.left;
    currentY = touch.clientY - rect.top;
  }

  previousX = currentX;
  previousY = currentY;
}
