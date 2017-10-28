import Vec3 from '../math/Vec3.js';
import Triangle from './Triangle.js';

export default class Mesh {
  constructor(vertices, faceMap) {
    let verts = [];
  
    if (typeof vertices[0] === 'number') {
      for (let i = 0; i < vertices.length; i += 3) {
        verts.push(new Vec3(
          vertices[i],
          vertices[i + 1],
          vertices[i + 2]
        ));
      }
    } else {
      verts = vertices;
    }
  
    this.faces = [];
    
    for (let i = 0; i < faceMap.length; i += 3) {
      this.faces.push(new Triangle(
        verts[faceMap[i]],
        verts[faceMap[i + 1]],
        verts[faceMap[i + 2]]
      ));
    }
  }
  
  draw(context, matrix) {
    const { faces } = this;
    
    for (let i = 0; i < faces.length; i++) {
      faces[i].draw(context, matrix);
    }
  }
}
