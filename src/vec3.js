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
        //TODO
    }
    multiply(f) {
        //TODO
    }
    multiplyByVector(v) {
        //TODO
    }
    squaredLength() {
        //TODO
    }
    length() {
        //TODO
    }
    unitVector() {
        //TODO
    }
    dot(v) {
        //TODO
    }
    toList() {
        //TODO
    }
    squareRoot() {
        //TODO
    }
    static random(min, max) {
        //TODO
    }
    static randomInUnitSphere() {
        //TODO
    }
    nearZero() {
        //TODO
    }
    reflect(n) {
        //TODO
    }
}
