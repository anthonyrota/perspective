export default class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }
  
  reverse() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  
  div(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  }
  
  scale(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }
  
  add(o) {
    this.x += o.x;
    this.y += o.y;
    this.z += o.z;
    return this;
  }
  
  sub(o) {
    this.x -= o.x;
    this.y -= o.y;
    this.z -= o.z;
    return this;
  }
  
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  
  cross(v) {
    const { x, y, z } = this;
    
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    
    return this;
  }
  
  len2() {
    return this.dot(this);
  }
  
  len() {
    return Math.sqrt(this.dot(this));
  }
  
  normalize() {
    return this.div(this.len());
  }
  
  static fromRotation(x, y, r = 1) {
    if (x instanceof Array) {
      y && (r = y);
      y = x[1];
      x = x[0];
    }
    
    const sinX = Math.sin(x / 180 * Math.PI);
    const cosX = Math.cos(x / 180 * Math.PI);
    const sinY = Math.sin(y / 180 * Math.PI);
    const cosY = Math.cos(y / 180 * Math.PI);
    
    return new Vec3(
      r * sinX * cosY,
      r * sinX * sinY,
      r * cosX
    );
  }
}
