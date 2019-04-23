import AnimationFrame from 'animation-frame';
import FPSMeter from 'fps-meter';

import './styles.scss';

const animationFrame = new AnimationFrame();
const fpsMeter = new FPSMeter('fps-meter');

const animate = () => {
  animationFrame.request(animate);
  fpsMeter.tick();
};

animate();
