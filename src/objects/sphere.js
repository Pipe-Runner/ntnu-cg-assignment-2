class Sphere {
  constructor(center, radius, material) {
    this.center = center;
    this.radius = radius;
    this.material = material;
  }

  hit(ray, tMin, tMax) {
    const oc = ray.origin.subtract(this.center);

    // Added mathematical simplification
    const a = ray.direction.squaredLength();
    const b = oc.dot(ray.direction);
    const c = oc.squaredLength() - this.radius * this.radius;

    /**
     * *INFO: Since we are removing a scaling factor of 2, the property of D does not change in this case
     */
    const D = b * b - a * c;

    const hitRecord = new HitRecord();

    if (D >= 0) {
      const t = (-b - Math.sqrt(D)) / a;

      if (t < tMax && t > tMin) {
        hitRecord.hit = true;
        hitRecord.point = ray.at(t);
        hitRecord.t = t;
        const N = ray
          .at(t)
          .subtract(this.center)
          .multiply(1 / this.radius);
        /**
         * *INFO: This step is unnecessary for the sphere where the normal calculation automatically points outwards of the surface
         */
        hitRecord.setFaceNormal(ray, N);
        hitRecord.material = this.material;
      }
    }

    return hitRecord;
  }
}
