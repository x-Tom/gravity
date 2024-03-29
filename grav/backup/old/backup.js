// [NOTE:s]



function Particle(x, y, mass, radius, colour){
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.mass = mass;
  this.radius = radius;
  this.colour = colour;
}




Particle.prototype.draw = function () {
  ctx.beginPath()
  ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
  ctx.fillStyle = this.colour;
  ctx.fill()
  ctx.closePath()
};

Particle.prototype.applyForce = function (newtons) { // (ai + bj)N - newtons force vector
  // F = ma, a = F/m
  this.ax += newtons.x/this.mass;
  this.ay += newtons.y/this.mass;
  //
};





Particle.prototype.update = function () {
  this.x += this.vx;
  this.vx += this.ax;
  this.y += this.vy;
  this.vy += this.ay;
}


/*


-Newtonian gravity in 2d space-

F = ma

F = G * (m1 * m2) / r

G will be some constant (circumference in 2d is 2πr)



*/

function vec2(x,y){
	return {
		x: x,
		y: y,
    resultant: Math.sqrt((x^2 + y^2)),
    angle: Math.atan2(y, x)
	};
}
