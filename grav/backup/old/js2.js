// [NOTE:s]


function Particle(x, y, mass, radius, colour){
  this.pos = vec2(x,y);
  this.vel = vec2(0,0);
  this.acc = vec2(0,0);
  this.mass = mass;
  this.radius = radius;
  this.colour = colour;
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
}


/* [NOTE]

-Newtonian gravity in 2d space-

F = ma

F = G * (m1 * m2) / r

G will be some constant (circumference in 2d is 2πr)



*/

function vec2(x,y){
	return {
		x: x,
		y: y,
    magnitude: Math.sqrt((x^2 + y^2)),
    angle: Math.atan2(y, x)
	};
}
