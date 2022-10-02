class Lambertian {
  constructor(albedo) {
    this.albedo = albedo;
  }

  scatter(ray, rec) {
    let scatterDirection = rec.normal.add(
      Vec3.randomInUnitSphere().unitVector()
    );

    if(scatterDirection.nearZero()){
        scatterDirection = rec.normal;
    }

    const scatteredRay = new Ray(rec.point, scatterDirection);
    return new ScatterRecord(scatteredRay, this.albedo, true);
  }
}
