class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  subtract(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  multiply(f) {
    return new Vec3(this.x * f, this.y * f, this.z * f);
  }
  multiplyByVector(v) {
    return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  }
  squaredLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.squaredLength());
  }
  unitVector() {
    return this.multiply(1 / this.length());
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  toList() {
    return [this.x, this.y, this.z];
  }
  squareRoot() {
    return new Vec3(Math.sqrt(this.x), Math.sqrt(this.y), Math.sqrt(this.z));
  }
  static random(min, max) {
    const scale = min + (max - min);
    const result = new Vec3(Math.random(), Math.random(), Math.random());
    return result.multiply(scale);
  }
  static randomInUnitSphere() {
    // const result = new Vec3(Math.random(), Math.random(), Math.random()).unitVector();
    // return result.multiply(Math.random());

    while (true) {
      const p = Vec3.random(-1, 1);
      if (p.squaredLength() >= 1) continue;
      return p;
    }
  }
  nearZero() {
    //TODO
  }
  reflect(n) {
    //TODO
  }
}
