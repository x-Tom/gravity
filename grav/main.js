import Timer from "./time.js"
import {Vec2} from "./math.js"
import Particle from "./particle.js"
import FundamentalForce from "./FForce.js"
import {barycenterOf2Bodies} from "./info.js"
import * as CNST from "./constants.js"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;

// EVENT LISTENERS
document.addEventListener("resize", () => { canvas.height = window.innerHeight; canvas.width  = window.innerWidth; }, false);

// [TODO] Add >2 objects, gravity between more than two objects
// [TODO] Add UI to Objects to create and move them and add initial velocity etc;
// [TODO] Add ShowField option to UI to show field lines

// import Simulation from "./Simulation.js"



// let GravitySimulation = new Simulation(canvas, context); //.....



let particles = [];

window.particles = particles;

// Colliding objects
// let particle1 = new Particle(400, 400, 1*Math.pow(10,15), 0, 20, "blue");
// let particle2 = new Particle(500, 300, 1*Math.pow(10,15), 0, 20, "green");

// Sattlelite System
let particle1 = new Particle(400, 300, 1*Math.pow(10,13.5), 0, 20, "blue");
let particle2 = new Particle(550, 200, 1*Math.pow(10,-2), 0, 20, "green", new Vec2(-2,-2));

// Binary System
// let particle1 = new Particle(400, 400, 1*Math.pow(10,13), 0, 20, "blue", new vec2(1,1), images[0]);
// let particle2 = new Particle(500, 300, 1*Math.pow(10,13), 0, 20, "green", new vec2(-1,-1), images[0]);



particles.push(particle1, particle2);
let gravity = new FundamentalForce(particles, "gravitational_field", "mass", CNST.G);

function collisions(objects){ // to be called inside of update before velocity vector is added to position vector

  if(Vec2.subtraction(objects[0].pos, objects[1].pos).magnitude <= objects[0].radius + objects[1].radius){
		objects[0].collide = true;
		objects[1].collide = true;
		return true;
	}

	return false;
}

function HUD(secsPerFrame){
  let FPS = 1/secsPerFrame;
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


  // draw barycenter

  let barycenter = barycenterOf2Bodies(particle1, particle2, "position");

  ctx.beginPath();
  ctx.arc(barycenter.x, barycenter.y, 1, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

}


let timer = new Timer;

timer.update = function update(dt) {

  ctx.clearRect(0,0, canvas.width, canvas.height);

	collisions(particles);

  particles.forEach(particle => {
    particle.update(dt);
    particle.draw(ctx);
  });



  HUD(this.time);


  // gravity.run("mass", "gravitational_field");

  gravity.run();
  // requestAnimationFrame(update);
}

timer.start();
// update();
