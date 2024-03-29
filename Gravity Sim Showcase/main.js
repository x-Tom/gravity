import Timer from "./lib/time.js"
import Simulation from "./Simulation.js"

let Particle = Simulation.p();
let Vec2 = Simulation.v();

let elements = document.querySelectorAll(".canvas");

let simulations = [];


// Colliding objects
// let particle1 = new Particle(400, 400, 1*Math.pow(10,15), 0, 20, "blue");
// let particle2 = new Particle(500, 300, 1*Math.pow(10,15), 0, 20, "green");

// Sattlelite System
// let particle1 = new Particle(400, 300, 1*Math.pow(10,13.5), 0, 20, "blue");
// let particle2 = new Particle(550, 200, 1*Math.pow(10,-2), 0, 20, "green", new Vec2(-2,-2));

// Binary System
// let particle1 = new Particle(400, 400, 1*Math.pow(10,13), 0, 20, "blue", new Vec2(1,1), images[0]);
// let particle2 = new Particle(500, 300, 1*Math.pow(10,13), 0, 20, "green", new Vec2(-1,-1), images[0]);

let simPairs = [];
simPairs.push(
  [ // Colliding objects
    new Particle(200, 200, 1*Math.pow(10,15), 0, 20, "blue"),
    new Particle(300, 100, 1*Math.pow(10,15), 0, 20, "green")
  ],
  [ // Sattlelite System
    new Particle(240, 180, 1*Math.pow(10,16), 0, 20, "blue"),
    new Particle(350, 100, 1*Math.pow(10,-2), 0, 20, "green", new Vec2(-45,-45))
  ],
  [ // Binary System
    new Particle(200, 200, 1*Math.pow(10,16), 0, 20, "blue", new Vec2(30,30)),
    new Particle(300, 100, 1*Math.pow(10,16), 0, 20, "green", new Vec2(-30,-30))
  ]
)


elements.forEach( (canvas, i) => {
  let [p1, p2] = simPairs[i];
  simulations.push(new Simulation(canvas, undefined, p1, p2))
})

simulations[0].HUD_TEXT = `Collision System`;
simulations[1].HUD_TEXT = `Sattlelite System`;
simulations[2].HUD_TEXT = `Binary System`;




let timer = new Timer;

timer.update = function update(dt) {
  simulations.forEach(sim => sim.update(dt, this.time));
}

timer.start();
// update();
