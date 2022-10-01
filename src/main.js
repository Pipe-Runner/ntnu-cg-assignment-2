// firstImage();
// blueWhiteGradient();
// redSphere();
// normalsSphere();
// sphereAndGround();
// antialiasing();
diffuseSphere();
//metalSpheres();

function firstImage() {
  const imageWidth = 256;
  const imageHeight = 256;
  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    console.log("Scanlines remaining: " + j);
    for (let i = 0; i < imageWidth; ++i) {
      const pixel = [];
      pixel.push(i / (imageWidth - 1));
      pixel.push(j / (imageHeight - 1));
      pixel.push(0.25);

      image.push(pixel);
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function blueWhiteGradient() {
  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // View port
  const origin = new Vec3(0, 0, 0);
  const viewportHeight = 2;
  const focalLength = 1.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const horizontal = new Vec3(viewportWidth, 0, 0);
  const vertical = new Vec3(0, viewportHeight, 0);
  const lowerLeftCorner = origin
    .subtract(horizontal.multiply(0.5))
    .subtract(vertical.multiply(0.5))
    .subtract(new Vec3(0, 0, focalLength));

  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      const u = i / (imageWidth - 1);
      const v = j / (imageHeight - 1);
      const r = new Ray(
        origin,
        lowerLeftCorner
          .add(horizontal.multiply(u))
          .add(vertical.multiply(v))
          .subtract(origin)
      );
      image.push(rayToColorV1(r).toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function redSphere() {
  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // View port
  const origin = new Vec3(0, 0, 0);
  const viewportHeight = 2;
  const focalLength = 1.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const horizontal = new Vec3(viewportWidth, 0, 0);
  const vertical = new Vec3(0, viewportHeight, 0);
  const lowerLeftCorner = origin
    .subtract(horizontal.multiply(0.5))
    .subtract(vertical.multiply(0.5))
    .subtract(new Vec3(0, 0, focalLength));

  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      const u = i / (imageWidth - 1);
      const v = j / (imageHeight - 1);
      const r = new Ray(
        origin,
        lowerLeftCorner
          .add(horizontal.multiply(u))
          .add(vertical.multiply(v))
          .subtract(origin)
      );
      image.push(rayToColorV2(r).toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function normalsSphere() {
  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // View port
  const origin = new Vec3(0, 0, 0);
  const viewportHeight = 2;
  const focalLength = 1.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const horizontal = new Vec3(viewportWidth, 0, 0);
  const vertical = new Vec3(0, viewportHeight, 0);
  const lowerLeftCorner = origin
    .subtract(horizontal.multiply(0.5))
    .subtract(vertical.multiply(0.5))
    .subtract(new Vec3(0, 0, focalLength));

  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      const u = i / (imageWidth - 1);
      const v = j / (imageHeight - 1);
      const r = new Ray(
        origin,
        lowerLeftCorner
          .add(horizontal.multiply(u))
          .add(vertical.multiply(v))
          .subtract(origin)
      );
      image.push(rayToColorV3(r).toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function sphereAndGround() {
  // world
  const world = new World();
  world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
  world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // View port
  const origin = new Vec3(0, 0, 0);
  const viewportHeight = 2;
  const focalLength = 1.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const horizontal = new Vec3(viewportWidth, 0, 0);
  const vertical = new Vec3(0, viewportHeight, 0);
  const lowerLeftCorner = origin
    .subtract(horizontal.multiply(0.5))
    .subtract(vertical.multiply(0.5))
    .subtract(new Vec3(0, 0, focalLength));

  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      const u = i / (imageWidth - 1);
      const v = j / (imageHeight - 1);
      const r = new Ray(
        origin,
        lowerLeftCorner
          .add(horizontal.multiply(u))
          .add(vertical.multiply(v))
          .subtract(origin)
      );
      image.push(rayToColorV4(r, world).toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function antialiasing() {
  // camera
  const camera = new Camera();
  const samplesPerPixel = 100;

  // world
  const world = new World();
  world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
  world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // image pixel matrix
  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      let color = new Vec3(0, 0, 0);

      // Here we take an average of the color of the pixel and its neighbors
      for (let sampleIdx = 0; sampleIdx < samplesPerPixel; sampleIdx++) {
        const u = (i + Math.random()) / (imageWidth - 1);
        const v = (j + Math.random()) / (imageHeight - 1);
        r = camera.getRay(u, v);
        color = color.add(rayToColorV4(r, world));
      }

      color = color.multiply(1 / samplesPerPixel);

      image.push(color.toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function diffuseSphere() {
  // camera
  const camera = new Camera();
  const samplesPerPixel = 100;

  // world
  const world = new World();
  world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
  world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

  // Screen space
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Number.parseInt(imageWidth / aspectRatio, 10);

  // image pixel matrix
  const image = [];

  for (let j = imageHeight - 1; j >= 0; --j) {
    for (let i = 0; i < imageWidth; ++i) {
      let color = new Vec3(0, 0, 0);

      // Here we take an average of the color of the pixel and its neighbors
      for (let sampleIdx = 0; sampleIdx < samplesPerPixel; sampleIdx++) {
        const u = (i + Math.random()) / (imageWidth - 1);
        const v = (j + Math.random()) / (imageHeight - 1);
        r = camera.getRay(u, v);
        color = color.add(rayToColorV5(r, world));
      }

      color = color.multiply(1 / samplesPerPixel);
      color = color.squareRoot();

      image.push(color.toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function metalSpheres() {
  //TODO
}

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */
function rayToColorV1(ray) {
  const unitDirection = ray.direction.unitVector();

  // Scaling t between 0 and 1
  const t = 0.5 * (unitDirection.y + 1.0);

  // Linear interpolation (lerp) between white and blue
  return new Vec3(1.0, 1.0, 1.0)
    .multiply(1.0 - t)
    .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
}

function rayToColorV2(ray) {
  if (hitSphereV1(new Vec3(0, 0, -1), 0.5, ray)) {
    return new Vec3(1, 0, 0);
  }

  const unitDirection = ray.direction.unitVector();

  // Scaling t between 0 and 1
  const t = 0.5 * (unitDirection.y + 1.0);

  // Linear interpolation (lerp) between white and blue
  return new Vec3(1.0, 1.0, 1.0)
    .multiply(1.0 - t)
    .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
}

function rayToColorV3(ray) {
  const sphereCenter = new Vec3(0, 0, -1);
  const tComputed = hitSphereV2(sphereCenter, 0.5, ray);
  if (tComputed !== -1) {
    const N = ray.at(tComputed).subtract(sphereCenter).unitVector();
    const r = (N.x + 1) * 0.5;
    const g = (N.y + 1) * 0.5;
    const b = (N.z + 1) * 0.5;
    return new Vec3(r, g, b);
  }

  const unitDirection = ray.direction.unitVector();

  // Scaling t between 0 and 1
  const t = 0.5 * (unitDirection.y + 1.0);

  // Linear interpolation (lerp) between white and blue
  return new Vec3(1.0, 1.0, 1.0)
    .multiply(1.0 - t)
    .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
}

function rayToColorV4(ray, world) {
  const hitRecord = world.hit(ray, 0, Infinity);

  if (hitRecord.hit) {
    const N = hitRecord.normal;
    const r = (N.x + 1) * 0.5;
    const g = (N.y + 1) * 0.5;
    const b = (N.z + 1) * 0.5;
    return new Vec3(r, g, b);
  }

  const unitDirection = ray.direction.unitVector();

  // Scaling t between 0 and 1
  const t = 0.5 * (unitDirection.y + 1.0);

  // Linear interpolation (lerp) between white and blue
  return new Vec3(1.0, 1.0, 1.0)
    .multiply(1.0 - t)
    .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
}

function rayToColorV5(ray, world, depth = 0) {
  if (depth >= 50) return new Vec3(0, 0, 0);

  // Increase the tMin to avoid shadow acne
  const hitRecord = world.hit(ray, 0.001, Infinity);

  if (hitRecord.hit) {
    const N = hitRecord.normal;
    const target = hitRecord.point.add(N).add(Vec3.randomInUnitSphere().unitVector());
    return rayToColorV5(
      new Ray(hitRecord.point, target.subtract(hitRecord.point)),
      world,
      depth + 1
    ).multiply(0.5);
  }

  const unitDirection = ray.direction.unitVector();

  // Scaling t between 0 and 1
  const t = 0.5 * (unitDirection.y + 1.0);

  // Linear interpolation (lerp) between white and blue
  return new Vec3(1.0, 1.0, 1.0)
    .multiply(1.0 - t)
    .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
}

function hitSphereV1(center, radius, ray) {
  const oc = ray.origin.subtract(center);

  const a = ray.direction.dot(ray.direction);
  const b = 2 * oc.dot(ray.direction);
  const c = oc.dot(oc) - radius * radius;

  const D = b * b - 4 * a * c;

  return D >= 0;
}

function hitSphereV2(center, radius, ray) {
  const oc = ray.origin.subtract(center);

  const a = ray.direction.dot(ray.direction);
  const b = 2 * oc.dot(ray.direction);
  const c = oc.dot(oc) - radius * radius;

  const D = b * b - 4 * a * c;

  if (D >= 0) {
    return (-b - Math.sqrt(D)) / (2 * a);
  }

  return -1;
}
