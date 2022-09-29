// firstImage();
blueWhiteGradient();
//redSphere();
//normalsSphere();
//sphereAndGround();
//antialiasing();
//diffuseSphere();
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

  function rayToColor(ray) {
    const unitDirection = ray.direction.unitVector();

    // Scaling t between 0 and 1
    const t = 0.5 * (unitDirection.y + 1.0);

    // Linear interpolation (lerp) between white and blue
    return new Vec3(1.0, 1.0, 1.0)
      .multiply(1.0 - t)
      .add(new Vec3(0.5, 0.7, 1.0).multiply(t));
  }

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
      image.push(rayToColor(r).toList());
    }
  }

  displayImage(imageWidth, imageHeight, image);
}

function redSphere() {
  //TODO
}

function normalsSphere() {
  //TODO
}

function sphereAndGround() {
  //TODO
}

function antialiasing() {
  //TODO
}

function diffuseSphere() {
  //TODO
}

function metalSpheres() {
  //TODO
}
