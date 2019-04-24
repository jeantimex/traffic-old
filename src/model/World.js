import Car from './Car';

export default class World {
  constructor() {
    this.cars = new Map();

    const car = new Car();
    this.cars.set(car.id, car);
  }

  addCar(car) {
    this.cars.set(car.id, car);
  }

  getCar(id) {
    return this.cars.get(id);
  }

  update(delta) {
    this.cars.forEach(car => {
      car.move(delta);
    });
  }
}
