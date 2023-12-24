export class RandomService {
  static range(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  static rangeFloat(min: number, max: number) {
    return this.random() * (max - min + 1) + min;
  }

  static random() {
    return Math.random();
  }
}
