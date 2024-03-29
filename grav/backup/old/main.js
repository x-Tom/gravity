const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// GRAVITATIONAL CONSTANT
let G = 100;
// let G = (6.67408 * Math.pow(10, -11))


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

vec2.multiplyScalar = (scalar, vector) => {
  return vec2(vector.x * scalar, vector.y * scalar);
}


function Particle(x, y, mass, radius, colour){
  this.pos = vec2(x,y);
  this.vel = vec2(0,0);
  this.acc = vec2(0,0);
  this.mass = mass;
  this.radius = radius;
  this.colour = colour;
  this.force = vec2.multiplyScalar(this.mass, this.acc);
}

Particle.prototype.draw = function () {
  ctx.beginPath()
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fillStyle = this.colour;
  ctx.fill()
  ctx.closePath()
};

Particle.prototype.applyForce = function (newtons) { // (ai + bj)N - newtons force vector
  // F = ma, a = F/m
  this.acc.x += newtons.x/this.mass;
  this.acc.y += newtons.y/this.mass;
  //
};

Particle.prototype.update = function () {
  this.pos.x += this.vel.x;
  this.vel.x += this.acc.x;
  this.pos.y += this.vel.y;
  this.vel.y += this.acc.y;

  this.force = vec2.multiplyScalar(this.mass, this.acc);
}


let particles = [];

let particle1 = new Particle(50, 50, 10, 20, "blue");

let particle2 = new Particle(500, 50, 10, 20, "green");

particles.push(particle1, particle2);

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.draw();
    particle.update();
  });

  gravity2objects(particle1, particle2);
  collisionChecker(particle1, particle2);

  requestAnimationFrame(draw);

}

draw()

// gravity2objects(particle1, particle2);

function gravity2objects(particle_1, particle_2){

  let displacementVec = vec2((particle_1.pos.x - particle_2.pos.x), (particle_1.pos.y - particle_2.pos.y));
  let distance = displacementVec.magnitude;

  console.log(displacementVec)

  let Fx = G * (particle_1.mass * particle_2.mass) / (displacementVec.x**2);
  // let Fy = G * (particle_1.mass * particle_2.mass) / (displacementVec.y**2);
  let Fy = 0;

  let F = vec2(Fx, Fy);
  let F_opp = vec2(-Fx, -Fy);

  particle_1.applyForce(F);
  particle_2.applyForce(F_opp);

}

function collisionChecker(particle_1, particle_2, actionFunc){

  // console.log(particle_1, particle_2)

  // collision point radius - work out coordinate where the two particles will collide and then define a radius around this
  // when the two particles are within this radius they will ping a collision and then can decide what will happen.

  console.log(particle_1.pos.x, particle_2.pos.x);

  if ( particle_1.pos.x == particle_2.pos.x ) {

    // action func is not used in here yet

    particle_1.vel.x = 0;
    particle_1.vel.y = 0;
    particle_2.vel.x = 0;
    particle_2.vel.y = 0;

    particle_1.acc.x = 0;
    particle_1.acc.y = 0;
    particle_2.acc.x = 0;
    particle_2.acc.y = 0;

    console.log("logic block reached!")

  }
}



/*


-Newtonian gravity in 2d space-

F = ma

F = G * (m1 * m2) / r

-Newtonian gravity in 3d space-

F = G * (m1 * m2) / r^2

-General-

G will be some constant (circumference in 2d is 2πr, surface area in 3d is 4πr^2)



*/

function vec2(x,y){
	return {
		x: x,
		y: y,
    magnitude: Math.sqrt( ( (x*x) + (y*y) ) ),
    angle: Math.atan2(y, x)
	};
}
