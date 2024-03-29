export default class Timer {
  constructor(dt = 1/60){
    let self = this;
    let acc = 0;
    let prevTime = 0;

    this.updateProxy = (time) => {
        self.raw_time = time;
        acc += (time - prevTime) / 1000;

        while (acc > dt) {
            self.time = (time - prevTime) / 1000;
            this.update(dt);
            acc -= dt;
        }

        prevTime = time;

        this.enqueue();
    }
  }

  enqueue() {
      requestAnimationFrame(this.updateProxy);
  }

  start() {
      this.enqueue();
  }

}
