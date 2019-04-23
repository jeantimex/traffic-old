import AnimationFrame from 'animation-frame';
import FPSMeter from 'fps-meter';
import World from 'model/World';

import './styles.scss';

const animationFrame = new AnimationFrame();
const fpsMeter = new FPSMeter('fps-meter');
const world = new World();

let then = Date.now();

const animate = () => {
  animationFrame.request(animate);
  fpsMeter.tick();

  const now = Date.now();
  const delta = now - then;
  then = now;

  world.update(delta);
};

const run = () => {
  animate();
};

run();
