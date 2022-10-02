class Metal {
  constructor(albedo, fuzz) {
    this.albedo = albedo;
    if (fuzz < 1) {
      this.fuzz = fuzz;
    } else {
      this.fuzz = 1;
    }
  }

  scatter(ray, rec) {
    let scatterDirection = ray.direction
      .unitVector()
      .reflect(rec.normal)
      .add(Vec3.randomInUnitSphere().multiply(this.fuzz));
    const scatteredRay = new Ray(rec.point, scatterDirection);
    const isScattered = scatterDirection.dot(rec.normal) > 0;
    return new ScatterRecord(scatteredRay, this.albedo, isScattered);
  }
}
