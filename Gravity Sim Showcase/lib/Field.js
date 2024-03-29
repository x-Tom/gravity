import {Vec2} from "./math.js"

export default class Field {
  constructor(range, type, behaviour){
    this.range = range
    this.type = type
    this.behaviour = behaviour;
    // this.strength =
  }

  strength(α, β, r) { // α = eg q or m, β = eg G or k, and where r is a position vector

    /*

    field strength (r is a vector) =

    +-( βα / |r|^3 ) r

    E = (kQ / |r|^3) r
    g = (-GM / |r|^3) r



    */

    let r_cubed = Math.pow(r.magnitude, 3);

    let field_strength = Vec2.multiplyScalar(r, (β*α) / r_cubed );

    if(this.type = "gravity") field_strength = Vec2.multiplyScalar(field_strength, -1);

    // if(r.magnitude > this.range){
    //   field_strength = 0;
    // }


    return field_strength;
  }

}
