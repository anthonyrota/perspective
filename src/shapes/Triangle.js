export default class Triangle {
  constructor(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
  }
  
  draw(context, matrix) {
    context.beginPath();
    
    const { v0, v1, v2 } = this;
    let b;
    let p;
    
    b = matrix.multiply(v0);
    context.moveTo(b.x, -b.y);
    
    p = matrix.multiply(v1);
    context.lineTo(p.x, -p.y);
    
    p = matrix.multiply(v2);
    context.lineTo(p.x, -p.y);
    
    context.lineTo(b.x, -b.y);
    
    context.closePath();
    context.stroke();
  }
}
