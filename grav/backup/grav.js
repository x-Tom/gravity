const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GRAVITATIONAL CONSTANT
// let G = 100;
const G = (6.67408 * Math.pow(10, -11))

// ELECTRIC FIELD CONSTANT
const K = 500;
// let K = (8.99 x Math.pow(10, 9));


const solarMass = n => n * (2*Math.pow(10, 30));
const earthMass = n => n * (6*Math.pow(10, 24))
const jovianMass = n => n * (2*Math.pow(10, 30))


let near = (op, target, range) => (op < target + range && op > target - range);
let inbounds = (x, range) => (x < x + range && x > x - range);

let srcs = ["earth.png", "sun.png", "mars.png"];
const srcprefix = "planet_images/";

function loadImage(url){
	return new Promise((resolve, reject) => {
		let image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		})
		image.src = url;
		image.addEventListener('error', () => {
			reject(image);
		})
	})
}

let images = [];
let loaded = [];
// srcs.forEach(src => loadImage(srcprefix+src));
// srcs.forEach(img => img.then(image => images.push(image)))

images = srcs.map(src => loadImage(srcprefix+src));

images.forEach((image) => {
  image.then(loaded.push(true));
});

console.log(srcs);
console.log(images);


class Particle {
  constructor(x, y, mass, charge, radius, colour, initial_v, image) {
    this.pos = new vec2(x,y);
    this.vel = initial_v || new vec2(0,0);
    this.acc = new vec2(0,0);
    this.mass = mass;
    this.charge = charge;
    this.radius = radius;
    this.colour = colour;
    this.image = image; // thenable promise object
    this.collide = {x: false, y: false};
    this.force = new vec2(0,0); // force felt or force exerted on particle
    this.gravitational_field = new Field(Infinity, "gravity", "point");
    // this.electric_field = new Field(Infinity, "electric", "point");

    // Particles.particles.push(this);
  }

  draw(){
    ctx.beginPath()
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill()
    ctx.closePath()

    if(this.image && loaded[images.indexOf(this.image)]) {
      this.image.then(img => {
        ctx.beginPath()
        ctx.drawImage(img, this.left-(img.width), this.top-(img.height), 1.41*2.25*this.radius, 2.25*this.radius );
        ctx.closePath()
      })

    }
  }

  update(𝛿t) {

    if(!𝛿t) 𝛿t = 1;

    this.acc = vec2.multiplyScalar(this.force, 1/this.mass);

    this.vel.x += this.acc.x * 𝛿t;
    this.vel.y += this.acc.y * 𝛿t;

    // let vely = this.vel.y;
    // let velx = this.vel.x;

    this.pos.x += ( (this.collide.x) ? 0 : this.vel.x * 𝛿t);
    this.pos.y += ( (this.collide.y) ? 0 : this.vel.y * 𝛿t);

    // this.force = Particle.particles

    // this.acc = vec2.multiplyScalar(this.force, 1/this.mass);
    // this.force.vec = vec2.multiplyScalar(this.mass, this.acc);
    // console.log("-");
  }

  get left() {
    return (this.pos.x - this.radius);
  }

  get right() {
    return (this.pos.x + this.radius)
  }

  get top() {
    return (this.pos.y - this.radius)
  }

  get bottom() {
    return (this.pos.y + this.radius)
  }

}



class vec2 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt( ( (x*x) + (y*y) ) );
    this.angle = Math.atan2(y, x);
  }

  static addition(vector1, vector2){
    return new vec2((vector1.x + vector2.x), (vector1.y + vector2.y));
  }

  static subtraction(vector1, vector2){
    return new vec2((vector1.x - vector2.x), (vector1.y - vector2.y));
  }

  static multiplyScalar(vector, scalar){
    return new vec2( (vector.x * scalar) , (vector.y * scalar) );
  }
}





class FundamentalForce { // Could be named God or whatever lmao
  constructor(objects){ // objects array. array of instances
    this.objects = objects;
    this.runCount = 0;
  }

  run(){

    let r0 = vec2.subtraction(this.objects[1].pos, this.objects[0].pos);
    let r1 = vec2.subtraction(this.objects[0].pos, this.objects[1].pos);

    let fstrength0 = this.objects[0].gravitational_field.strength(this.objects[0].mass, G, r0);
    let fstrength1 = this.objects[1].gravitational_field.strength(this.objects[1].mass, G, r1);


    this.objects[0].force = vec2.multiplyScalar(fstrength1, this.objects[0].mass);
    this.objects[1].force = vec2.multiplyScalar(fstrength0, this.objects[1].mass);

    // ----------------------------------------------------------------------------------------



    this.objects[1].force = vec2.multiplyScalar(fstrength0, this.objects[1].mass);


    if(this.runCount == 10){
      console.log(r0, r1);
      console.log(fstrength0, fstrength1);
      console.log(this.objects[0].force, this.objects[1].force)
    }

    this.runCount++;
  }



}

class Field {
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

    let field_strength = vec2.multiplyScalar(r, (β*α) / r_cubed );

    if(this.type = "gravity") field_strength = vec2.multiplyScalar(field_strength, -1);

    // if(r.magnitude > this.range){
    //   field_strength = 0;
    // }


    return field_strength;
  }

}


Particle.particles = [];

// Collision
// let particle1 = new Particle(400, 400, 1*Math.pow(10,13), 0, 20, "blue");
// let particle2 = new Particle(500, 300, 1*Math.pow(10,13), 0, 20, "green");


// Sattlelite orbit
// let particle1 = new Particle(400, 300, 1*Math.pow(10,13.5), 0, 20, "blue");
// let particle2 = new Particle(550, 200, 1*Math.pow(10,-2), 0, 20, "green", new vec2(-2,-2));

// Binary System
let particle1 = new Particle(400, 400, 1*Math.pow(10,13), 0, 20, "blue", new vec2(1,1), images[0]);
let particle2 = new Particle(500, 300, 1*Math.pow(10,13), 0, 20, "green", new vec2(-1,-1), images[0]);




// let r0 = vec2.subtraction(particle1.pos, particle2.pos)
// console.log("r0:");
// console.log(r0);
// console.log("grav field stregth 0: ");
// console.log(particle1.gravitational_field.strength(particle1.mass, G, r0));
//
//
// let r1 = vec2.subtraction(particle2.pos, particle1.pos)
// console.log("r1:");
// console.log(r1);
// console.log("grav field stregth 1: ");
// console.log(particle2.gravitational_field.strength(particle2.mass, G, r1));

function collisions(objects){ // to be called inside of update before velocity vector is added to position vector

  let x0pr = objects[0].pos.x + objects[0].radius;
  let x0sr = objects[0].pos.x - objects[0].radius;
  let x1pr = objects[1].pos.x + objects[1].radius;
  let x1sr = objects[1].pos.x - objects[1].radius;

  let y0pr = objects[0].pos.y + objects[0].radius;
  let y0sr = objects[0].pos.y - objects[0].radius;
  let y1pr = objects[1].pos.y + objects[1].radius;
  let y1sr = objects[1].pos.y - objects[1].radius;

  // near(obj, target, range)


  if((objects[0].pos.x - objects[1].pos.x) < 0){


    if( x0pr == x1sr ) {

    // if( x0pr ==  x1sr) {
      objects[0].collide.x = true;
      objects[1].collide.x = true;
    }
  }

  if((objects[0].pos.x - objects[1].pos.x) > 0){

    if(  x0sr  ==  x1pr ){
      objects[0].collide.x = true;
      objects[1].collide.x = true;

    }
  }

  if((objects[0].pos.y - objects[1].pos.y) < 0) {

    if( y0pr ==  y1sr) {
      objects[0].collide.y = true;
      objects[1].collide.y = true;
    }
  }
  if((objects[0].pos.y - objects[1].pos.y) > 0) {

    if(y0sr == y1pr) {
      console.log("lol");
      objects[0].collide.y = true;
      objects[1].collide.y = true;
    }
  }

}


function HUD(){
  let fps = FPS;
  if(!(DRAW_COUNT % 10)) {

  }

  // FPS COUNTER
  ctx.beginPath();
  ctx.font = "14px Monaco";
  ctx.fillStyle = "black";
  ctx.fillText(`${Math.round(FPS)} FPS`, canvas.width-70, 20);
  ctx.closePath();

  // TITLE
  ctx.beginPath();
  ctx.font = "14px Monaco";
  ctx.fillStyle = "black";
  ctx.fillText(`Newtonian Gravity Sim`, 20, 20);
  ctx.closePath();



}




function framesec(){ // mostly a doing function but does return dt
  if(!DRAW_COUNT) TIME = (new Date()).getTime();

  let currentTime = (new Date()).getTime();

  let drawTime = currentTime - TIME;
  let drawSec = drawTime * 0.001;

  TIME = currentTime;

  LAG += drawTime;

  FPS = 1/drawSec;

  return drawTime;
}

Particle.particles.push(particle1,particle2);


let gravity = new FundamentalForce(Particle.particles);

let DRAW_COUNT = 0;
let TIME = 0;
let FPS = 0;
let LAG = 0;

const step = 1/60;

function draw() {

  let dt = framesec(); // dt is time elapsed per frame (draw time)
  let 𝛿t = dt/1000;
  let ftr = dt/(1000/60);
  if(ftr > 3) console.log(ftr);
  // [TODO] Make everything time dependant, vel.x*dt, vel.y*dt, update(dt)

  ctx.clearRect(0,0, canvas.width, canvas.height);

  Particle.particles.forEach(particle => {
    particle.update(/*step*/);
    particle.draw();
  });

  // LAG+=step;
  //
  //
  // console.log("lag", LAG);
  // console.log("step", step);
  //
  // while(LAG > step) {
  //   Particle.particles.forEach(particle => particle.update(step));
  //   LAG-=step;
  // }
  //
  // Particle.particles.forEach(particle => particle.draw());
  //

  HUD();


  // gravity.run("mass", "gravitational_field");

  if (DRAW_COUNT == 10) {
    // console.log(particle1.force, particle2.force);
  }


  gravity.run();

  DRAW_COUNT++;
  requestAnimationFrame(draw);
}

draw();
