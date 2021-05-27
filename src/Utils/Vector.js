class Vector {
  constructor(x, y) {
    if (x !== undefined) {
      this.x = x;
    } else {
      this.x = 0;
    }
    if (y !== undefined) {
      this.y = y;
    } else {
      this.y = 0;
    }
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}
export default Vector;
