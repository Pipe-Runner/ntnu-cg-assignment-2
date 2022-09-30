class World {
  objects = [];

  add(object) {
    this.objects.push(object);
  }

  hit(ray, tMin, tMax) {
    let closestHitRecord;

    for (let i = 0; i < this.objects.length; i++) {
      const hitRecord = this.objects[i].hit(ray, tMin, tMax);

      if (hitRecord.hit) {
        if (closestHitRecord) {
          closestHitRecord =
            hitRecord.t < closestHitRecord.t ? hitRecord : closestHitRecord;
        } else {
          closestHitRecord = hitRecord;
        }
      }
    }

    return closestHitRecord ? closestHitRecord : new HitRecord();
  }
}
