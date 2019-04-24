export default class Trajectory {
  constructor(car, lane, position) {}

  get direction() {}

  get coords() {}

  moveForward(distance) {
    distance = Math.max(distance, 0);
    console.log(distance);
  }
}
