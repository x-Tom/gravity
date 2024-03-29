run(property, field){ // strings only
  // let localArr = this.objects.slice();
  let localArr = [...this.objects]; // loop through array copy

  for (let i = 0; i < this.objects.length; i++){

    let f = Force.zero();
    console.log(f);
    for (let j = 0; j < localArr.length; j++) {
      // this.objects[i].force = vec2.multiplyScalar(, localArr[0][property])

      // field strength function ->  strength(mass or charge, constant, distance vector)

      let dist = vec2.subtraction(localArr[j].pos, localArr[0].pos);

      let field_strength = localArr[j][field].strength(localArr[j][property], G, dist);

      let f_ = new Force(field_strength, localArr[0][property]);
      console.log(f_);
      f = Force.sum(f, f_);
      console.log(f)
    }

    this.objects[i].force = f;
    localArr.push(localArr.shift()); // remove first index and put it on the end of the array

  }
}

gravity.run("mass", "gravitational_field");


run(property, field){ // strings only
  // let localArr = this.objects.slice();
  let localArr = [...this.objects]; // loop through array copy

  for (let i = 0; i < this.objects.length; i++){

    let f = Force.zero();
    console.log(f);
    for (let j = 0; j < localArr.length; j++) {
      // this.objects[i].force = vec2.multiplyScalar(, localArr[0][property])

      // field strength function ->  strength(mass or charge, constant, distance vector)

      let dist = vec2.subtraction(localArr[j].pos, localArr[0].pos);

      let field_strength = localArr[j][field].strength(localArr[j][property], G, dist);

      let f_ = new Force(field_strength, localArr[0][property]);
      console.log(f_);
      f = Force.sum(f, f_);
      console.log(f)
    }

    this.objects[i].force = f;
    localArr.push(localArr.shift()); // remove first index and put it on the end of the array

  }
}



// class Force { // force exerted on them or force they feel, from other particles fields
//   constructor(acc, α){ // acc is another particle radial field.
//     this.vec = vec2.multiplyScalar(acc, α);
//   }
//
//   static sum(f1, f2){
//     return new Force(vec2.addition(f1.vec, f2.vec), 1);
//   }
//
//   static zero(){
//     return new Force( ( new vec2(0,0) ), 0);
//   }
//
// }



// ----------------------------------------------------------------------------------------- \\
static power(vector, power){ // must keep direction only +-(|value|)^power
  let vecx;
  let vecy;

  vecx = Math.pow(vector.x, power);
  vecy = Math.pow(vector.y, power);


  if(power <= 0){
    if(!vector.x){
      vecx = 0;
    }
    if(!vector.y){
      vecy = 0;
    }
  }

  if (vector.y < 0) {
    vecy = -Math.pow(Math.abs(vector.y), power);
  }

  if (vector.x < 0) {
    vecx = -Math.pow(Math.abs(vector.x), power);
  }

  // console.log(new vec2(vecx,vecy));
  return new vec2(vecx, vecy);
}
