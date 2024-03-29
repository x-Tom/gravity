import Timer from "./lib/time.js"
import {Vec2} from "./lib/math.js"
import Particle from "./lib/particle.js"
import FundamentalForce from "./lib/FForce.js"
import {barycenterOf2Bodies} from "./lib/info.js"
import * as CNST from "./lib/constants.js"

// NON-INTERACTIVE SIMULATION CANVAS ANIMATION - USED TO BE EMBEDDED AS EXAMPLES IN WEBPAGE

export default class Simulation {
  constructor(canvas, HUD_TEXT = `Newtonian Gravity Sim`, p1, p2, ...pX){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 480;
    this.canvas.height = 360;

    this.particles = [];

    let particle1 = p1 || new Particle(400, 400, 1*Math.pow(10,15), 0, 20, "blue");
    let particle2 = p2 || new Particle(500, 300, 1*Math.pow(10,15), 0, 20, "green");


    this.particles.push(particle1, particle2);
    if(pX) this.particles.push(...pX);

    this.gravity = new FundamentalForce(this.particles, "gravitational_field", "mass", CNST.G);

    this.collisions = (objects) => { // to be called inside of update before velocity vector is added to position vector

      if(Vec2.subtraction(objects[0].pos, objects[1].pos).magnitude <= objects[0].radius + objects[1].radius){
    		objects[0].collide = true;
    		objects[1].collide = true;
    		return true;
    	}

    	return false;
    }

    this.HUD_TEXT = HUD_TEXT;

    this.HUD = (secsPerFrame ) => {
      let FPS = 1/secsPerFrame;
      // FPS COUNTER
      this.ctx.beginPath();
      this.ctx.font = "14px Monaco";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`${Math.round(FPS)} FPS`, canvas.width-70, 20);
      this.ctx.closePath();

      // TITLE
      this.ctx.beginPath();
      this.ctx.font = "14px Monaco";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(this.HUD_TEXT, 20, 20);
      this.ctx.closePath();

      // draw barycenter

	  let barycenter = barycenterOf2Bodies(this.particles[0], this.particles[1], "position");

	  console.log(barycenter)
	  this.ctx.beginPath();
	  this.ctx.arc(barycenter.x, barycenter.y, 1, 0, Math.PI*2);
	  this.ctx.fillStyle = "red";
	  this.ctx.fill();
	  this.ctx.closePath();


    }
  }

  update(dt, spf){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

  	this.collisions(this.particles);

    this.particles.forEach(particle => {
      particle.update(dt);
      particle.draw(this.ctx);
    });



    this.HUD(spf, this.HUD_TEXT);


    // gravity.run("mass", "gravitational_field");

    this.gravity.run();
    // requestAnimationFrame(update);
  }

  static p() {
    return Particle;
  }
  static v() {
    return Vec2
  }
}
