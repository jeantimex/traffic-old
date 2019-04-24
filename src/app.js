import AnimationFrame from 'animation-frame';
import FPSMeter from 'fps-meter';
import World from 'model/World';

import './styles.scss';

const animationFrame = new AnimationFrame();
const fpsMeter = new FPSMeter('fps-meter');
const world = new World();

const defaultTimeFactor = 5;

let then = Date.now();
let isPaused = true;

window.addEventListener('keydown', () => {
  isPaused = !isPaused;
});

const animate = () => {
  animationFrame.request(animate);
  fpsMeter.tick();

  const now = Date.now();
  const delta = now - then;
  then = now;

  if (!isPaused) {
    world.update((defaultTimeFactor * delta) / 1000);
  }
};

const run = () => {
  animate();
};

run();
