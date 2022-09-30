class HitRecord {
  constructor() {
    this.point = new Vec3(0, 0, 0);
    this.normal = new Vec3(0, 0, 0);
    this.t = 0;
    this.material = {};
    this.hit = false;
  }

  setFaceNormal(ray, outwardNormal) {
    if (ray.direction.dot(outwardNormal) > 0) {
      this.normal = outwardNormal.multiply(-1);
    } else {
      this.normal = outwardNormal;
    }
  }
}
