class HitRecord {
    constructor() {
        this.point = new Vec3(0, 0, 0);
        this.normal = new Vec3(0, 0, 0);
        this.t = 0;
        this.material = {};
        this.hit = false;
    }
    
    setFaceNormal(ray, outwardNormal) {
        //TODO
    }
};