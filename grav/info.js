import {Vec2} from "./math.js"

/*

r1 is distance from body1 to barycenter
a is the distance between the centers of the two bodies
m1 and m2 are the masses of the two bodies.

r1 = a / ( 1 + (m1/m2) )



*/

export function barycenterOf2Bodies(body1, body2, option="position"){
  let displacement = Vec2.subtraction(body1.pos, body2.pos);
  let distance = displacement.magnitude; // distance

  let a = distance;
  let m1 = body1.mass;
  let m2 = body2.mass;


  let r1 = a / ( 1 + (m1/m2) );

  let r1Vec = Vec2.multiplyScalar( Vec2.multiplyScalar(displacement, 1/distance), r1 );

  let pos = Vec2.subtraction(body1.pos, r1Vec);

  if(option == "position") return pos;
  if(option == "displacement") return r1Vec;
  if(option == "scalar") return r1;


  throw new Error;
  return false;
}
