const canvases = [document.getElementById('canvas1'), document.getElementById('canvas2')];
const ctxs = canvases.map(c => c.getContext('2d'));

let drawing = false;
let penColor = document.getElementById('colorPicker').value;
const penThickness = 18; // fixed thickness

document.getElementById('colorPicker').addEventListener('change', e => {
  penColor = e.target.value;
});

canvases.forEach((canvas, index) => {
  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseleave', () => drawing = false);
  canvas.addEventListener('mousemove', e => draw(e, index));
});

function draw(e, index) {
  if (!drawing) return;
  const rect = canvases[index].getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctxs[index].fillStyle = penColor;
  ctxs[index].beginPath();
  ctxs[index].arc(x, y, penThickness / 2, 0, Math.PI * 2);
  ctxs[index].fill();
}

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
  ctxs.forEach(ctx => ctx.clearRect(0, 0, 400, 400));
});
