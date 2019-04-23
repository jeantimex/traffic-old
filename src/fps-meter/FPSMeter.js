import './fps-meter.scss';

const MS_IN_ONE_SECOND = 1000;
const now = Date.now || (() => new Date.getTime());

export default class FPSMeter {
  constructor(element, opts = {}) {
    if (typeof element === 'string') {
      this.element = document.querySelector('#' + element);
    } else {
      this.element = element;
    }
    this.element.classList.add('fps-element');

    this.updateRate = opts.updateRate || MS_IN_ONE_SECOND;
    this.tickCounter = 0;
    this.updateTimeoutId = null;

    this.start(fps => {
      this.element.innerHTML = fps + ' FPS';
    });
  }

  start(callback) {
    this.startTime = now();
    this.tickCounter = 0;

    this.updateTimeoutId = setTimeout(() => {
      if (this.tickCounter > 0) {
        callback(
          Math.round(
            MS_IN_ONE_SECOND / ((now() - this.startTime) / this.tickCounter)
          )
        );
      }
      this.start(callback);
    }, this.updateRate);
  }

  stop() {
    clearTimeout(this.updateTimeoutId);
  }

  tick() {
    this.tickCounter += 1;
  }
}
