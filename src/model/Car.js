import uuid from 'uuid/v1';
import Trajectory from './Trajectory';

export default class Car {
  constructor(lane, position) {
    // private
    this._speed = 0;

    // public
    this.id = uuid();
    this.maxSpeed = 30;
    this.distanceGap = 2;
    this.timeHeadway = 1.5;
    this.maxAcceleration = 1;
    this.maxDeceleration = 3;
    this.trajectory = new Trajectory(this, lane, position);
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    speed = speed < 0 ? 0 : speed;
    speed = speed > this.maxSpeed ? this.maxSpeed : speed;
    this._speed = speed;
  }

  get coords() {
    return this.trajectory.coords;
  }

  get direction() {
    return this.trajectory.direction;
  }

  getAcceleration() {
    const frontCarDistance = { car: null, distance: 0 };
    const distanceToFrontCar = Math.max(frontCarDistance.distance, 0);
    const a = this.maxAcceleration;
    const b = this.maxDeceleration;
    const deltaSpeed = frontCarDistance.car
      ? this.speed - frontCarDistance.car.speed
      : 0;
    const freeRoadCoeff = Math.pow(this.speed / this.maxSpeed, 4);
    const timeGap = this.speed * this.timeHeadway;
    const breakGap = (this.speed * deltaSpeed) / (2 * Math.sqrt(a * b));
    const safeDistance = this.distanceGap + timeGap + breakGap;
    const busyRoadCoeff = Math.pow(safeDistance / distanceToFrontCar, 2);
    // const safeIntersectionDistance =
    // 1 + timeGap + Math.pow(this.speed, 2) / (2 * b);
    const coeff = 1 - freeRoadCoeff - busyRoadCoeff;
    return this.maxAcceleration * coeff;
  }

  move(delta) {
    const acceleration = this.getAcceleration();
    this.speed += acceleration * delta;

    const step = this.speed * delta + 0.5 * acceleration * Math.pow(delta, 2);
    this.trajectory.moveForward(step);
  }
}
