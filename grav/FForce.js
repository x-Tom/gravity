import * as CNST from "./constants.js"
import {Vec2} from "./math.js"
import Field from "./Field.js"

export default class FundamentalForce { // Could be named God or whatever lmao
  constructor(objects, field, quantity, constant){ // objects array. array of instances
    this.objects = objects;
    this.field = field;
    this.quantity = quantity;
    this.constant = constant;
    this.runCount = 0;
  }

  run(){

    const field = this.field;
    const quantity = this.quantity;
    const constant = this.constant;

    // let r0 = Vec2.subtraction(this.objects[1].pos, this.objects[0].pos);
    // let r1 = Vec2.subtraction(this.objects[0].pos, this.objects[1].pos);

    // // let fstrength0 = this.objects[0].gravitational_field.strength(this.objects[0].mass, CNST.G, r0);
    // // let fstrength1 = this.objects[1].gravitational_field.strength(this.objects[1].mass, CNST.G, r1);

    // let fstrength0 = this.objects[0][field].strength(this.objects[0][quantity], constant, r0);
    // let fstrength1 = this.objects[1][field].strength(this.objects[1][quantity], constant, r1);


    // // this.objects[0].force = Vec2.multiplyScalar(fstrength1, this.objects[0].mass);
    // // this.objects[1].force = Vec2.multiplyScalar(fstrength0, this.objects[1].mass);

    // this.objects[0].force = Vec2.multiplyScalar(fstrength1, this.objects[0][quantity]);
    // this.objects[1].force = Vec2.multiplyScalar(fstrength0, this.objects[1][quantity]);



    // combinationFn(this.objects).forEach((r,i) => {
    //   let fstrength = this.objects[i][field].strength(this.objects[i][quantity], constant, r);
    //   this.objects[i].force = Vec2.multiplyScalar(fstrength, this.objects[i][quantity]);
    // });

    combinationFn(this.objects, field, constant, quantity);


    // ----------------------------------------------------------------------------------------



    // this.objects[1].force = Vec2.multiplyScalar(fstrength0, this.objects[1].mass);


    // if(this.runCount == 10){
    //   console.log(r0, r1);
    //   console.log(fstrength0, fstrength1);
    //   console.log(this.objects[0].force, this.objects[1].force)
    // }

    this.runCount++;
  }



}




function combinationFn(array, field, constant, quantity){
  let [x, ...arr] = array;

  let f_vectors = [];

  for(let j = 0; j < array.length; j++){

    // f_vectors[j] = x;


    for(let i = 0; i < arr.length; i++){
      // fn(x, arr[i])
      let r = Vec2.subtraction(x.pos, arr[i].pos);
      let fst = arr[i][field].strength(arr[i][quantity], constant, r) // 

      x.force = Vec2.addition(x.force, Vec2.multiplyScalar(fst, arr[i][quantity]));

    }

    f_vectors[j] = x.force;


    let temp = x;
    x = arr[j];
    arr[j] = temp;


  }


  return f_vectors;
}
