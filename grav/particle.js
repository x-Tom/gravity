import Field from "./Field.js"
import {Vec2} from "./math.js"


export default class Particle {
  constructor(x, y, mass, charge, radius, colour, initial_v, image) {
    this.pos = new Vec2(x,y);
    this.vel = initial_v || new Vec2(0,0);
    this.acc = new Vec2(0,0);
    this.mass = mass;
    this.charge = charge;
    this.radius = radius;
    this.colour = colour;
    this.image = image; // thenable promise object
    this.collide = false;
    this.force = new Vec2(0,0); // force felt or force exerted on particle
    this.gravitational_field = new Field(Infinity, "gravity", "point");
    // this.electric_field = new Field(Infinity, "electric", "point");

    if(Number.isNaN(mass) || Number.isNaN(charge)) throw new Error;

    // Particles.particles.push(this);
  }

  draw(ctx){
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

    this.acc = Vec2.multiplyScalar(this.force, 1/this.mass);

    this.vel.x += this.acc.x * 𝛿t;
    this.vel.y += this.acc.y * 𝛿t;

    // let vely = this.vel.y;
    // let velx = this.vel.x;

    this.pos.x += ( (this.collide) ? 0 : this.vel.x * 𝛿t);
    this.pos.y += ( (this.collide) ? 0 : this.vel.y * 𝛿t);

    // this.force = Particle.particles

    // this.acc = Vec2.multiplyScalar(this.force, 1/this.mass);
    // this.force.vec = Vec2.multiplyScalar(this.mass, this.acc);
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
