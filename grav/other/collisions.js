const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let near = (op, target, range) => (op < target + range && op > target - range);
let inbounds = (x, range) => (x < x + range && x > x - range);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Particle {
  constructor(x, y, mass, charge, radius, colour, initial_v) {
    this.pos = new vec2(x,y);
    this.vel = initial_v || new vec2(0,0);
    this.acc = new vec2(0,0);
    this.mass = mass;
    this.charge = charge;
    this.radius = radius;
    this.colour = colour;
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
  }

  update() {
    this.acc = vec2.multiplyScalar(this.force, 1/this.mass);

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;

    // let vely = this.vel.y;
    // let velx = this.vel.x;

    this.pos.x += ( (this.collide.x) ? 0 : this.vel.x );
    this.pos.y += ( (this.collide.y) ? 0 : this.vel.y );

    // this.force = Particle.particles

    // this.acc = vec2.multiplyScalar(this.force, 1/this.mass);
    // this.force.vec = vec2.multiplyScalar(this.mass, this.acc);
    // console.log("-");
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



Particle.particles = [];

let particle1 = new Particle(400, 300, 1*Math.pow(10,13.5), 0, 20, "blue");
let particle2 = new Particle(550, 200, 1*Math.pow(10,-2), 0, 20, "green", new vec2(-2,-2));



let DRAW_COUNT = 0;
let TIME = 0;
let FPS = 0;

function draw() {

  let dt = framesec();
  // [TODO] Make everything time dependant, vel.x*dt, vel.y*dt, update(dt)

  ctx.clearRect(0,0, canvas.width, canvas.height);
  Particle.particles.forEach(particle => {
    particle.draw();
    particle.update();
  });

  HUD();


  // gravity.run("mass", "gravitational_field");

  if (DRAW_COUNT == 10) {
    // console.log(particle1.force, particle2.force);
  }

  if(particle1.pos.x == particle2.pos.x) {
    console.log("***");
    console.log(particle1, particle2);
  }

  gravity.run();
  DRAW_COUNT++;
  requestAnimationFrame(draw);

}

draw();



function framesec(){
  if(!DRAW_COUNT) TIME = (new Date()).getTime();

  let drawTime = (new Date()).getTime() - TIME;
  let drawSec = drawTime * 0.001;

  TIME = ((new Date()).getTime())

  FPS = 1/drawSec;

  return drawTime;
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
