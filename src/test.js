import Mesh from './shapes/Mesh.js';
import Vec3 from './math/Vec3.js';
import Mat4 from './math/Mat4.js';
import Camera from './view/Camera.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.translate(canvas.width / 2, canvas.height / 2);

const vertices = [
  -1, -1, -1,
  1, -1, -1,
  1,  1, -1,
  -1,  1, -1,
  -1, -1,  1,
  1, -1,  1,
  1,  1,  1,
  -1,  1,  1
];

const faces = [
  0, 2, 1,  0, 3, 2,
  1, 2, 6,  6, 5, 1,
  4, 5, 6,  6, 7, 4,
  2, 3, 6,  6, 3, 7,
  0, 7, 3,  0, 4, 7,
  0, 1, 5,  0, 5, 4
];

const mesh = new Mesh(vertices, faces);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  context.translate(canvas.width / 2, canvas.height / 2);
});

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let camera = new Camera();
  
camera.attatch(canvas);

const update = () => {
  window.requestAnimationFrame(update);
  
  context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  
  const width = canvas.width / 2;
  const height = canvas.height / 2;
  
  const matrix = camera.matrix();
  
  mesh.draw(context, matrix);
};
update();
