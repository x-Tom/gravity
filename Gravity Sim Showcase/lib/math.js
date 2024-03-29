export class Vec2 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt( ( (x*x) + (y*y) ) );
    this.angle = Math.atan2(y, x);
  }

  static addition(vector1, vector2){
		if (vector1.x == undefined) throw new Error;
    return new Vec2((vector1.x + vector2.x), (vector1.y + vector2.y));
  }

  static subtraction(vector1, vector2){
		if (vector1.x == undefined) throw new Error;
    return new Vec2((vector1.x - vector2.x), (vector1.y - vector2.y));
  }

  static multiplyScalar(vector, scalar){
    return new Vec2( (vector.x * scalar) , (vector.y * scalar) );
  }
}
