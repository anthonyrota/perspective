import Vec3 from '../math/Vec3.js';
import Mat4 from '../math/Mat4.js';
import EventHandler from './EventHandler.js';

const UP = new Vec3(0, 1, 0);

export default class Camera {
  constructor(
    position = new Vec3(0, 0, -20),
    rotation = [1, 1],
    scale = Math.min(window.innerWidth, window.innerHeight) / 7
  ) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }
  
  attatch(canvas) {
    const keys = {
      87: new Vec3(0, 0, 0.08),
      83: new Vec3(0, 0, -0.08),
      65: new Vec3(-2, 0, 0),
      68: new Vec3(2, 0, 0),
      32: new Vec3(0, -3, 0),
      16: new Vec3(0, 3, 0)
    };
    
    const vel = new Vec3(0, 0, 0);
    const drag = 0.87;
    const self = this;
    
    new EventHandler({
      element: canvas,
      update(pressed) {
        for (let code in keys) {
          if (pressed[code]) {
            vel.add(keys[code]);
          }
        }
        
        self.position.add(vel.scale(drag));
      },
      mouseMove(e, vx, vy) {
        self.rotation[0] += vx / 50;
        self.rotation[1] += vy / 50;
      }
    });
  }
  
  matrix() {
    const mat = Mat4.multiply(
      Mat4.perspective(50, 1, 5, 100),
      Mat4.lookAt(
        this.position,
        Vec3.fromRotation(this.rotation).add(this.position),
        UP),
      Mat4.zoom(this.scale)
    );
    
    return mat;
  }
}
