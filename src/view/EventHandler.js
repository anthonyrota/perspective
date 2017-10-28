export default class EventHandler {
  constructor({ element, update, keyPressed, mouseMove }) {
    this.pressed = {};
    
    this._keyPressed = keyPressed || (() => {});
    this._mouseMove = mouseMove || (() => {});
    this._update = update || (() => {});
    
    this.attach(element);
  }
  
  attach(element) {
    element.addEventListener('mousedown', e => element.requestPointerLock());
    
    const keypressed = this.keypressed.bind(this);
    const keyreleased = this.keyreleased.bind(this);
    const mousemove = this.mousemove.bind(this);
    const _update = this._update.bind(element);
    
    document.addEventListener('pointerlockchange', e => {
      if (document.pointerLockElement === element) {
        document.addEventListener('keydown', keypressed);
        document.addEventListener('keyup', keyreleased);
        document.addEventListener('mousemove', mousemove);
      } else {
        document.removeEventListener('keydown', keypressed);
        document.removeEventListener('keyup', keyreleased);
        document.removeEventListener('mousemove', mousemove);
      }
    });
    
    const update = () => {
      window.requestAnimationFrame(update);
      _update(this.pressed);
    };
    update();
  }
  
  keypressed(e) {
    this.pressed[e.keyCode] = true;
    this._keyPressed(e, true);
  }
  
  keyreleased(e) {
    this.pressed[e.keyCode] = false;
    this._keyPressed(e, false);
  }
  
  mousemove(e) {
    this._mouseMove(e, e.movementX, e.movementY);
  }
}
