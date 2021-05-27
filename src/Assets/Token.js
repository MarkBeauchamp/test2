import IImageItem from "./IImageItem";

class Token extends IImageItem {
  constructor({ image, name, position, offset, locked }) {
    super({ image, name, position, offset });
    this.locked = locked !== undefined ? locked : false;
  }
  getScreenPosition(camera) {
    let screenPosition = camera.worldTileToScreen(this.position);
    screenPosition.x += this.offset.x;
    screenPosition.y += this.offset.y;

    return screenPosition;
  }
  draw(p5, camera) {
    const screenPosition = this.getScreenPosition(camera);
    p5.image(this.image, screenPosition.x, screenPosition.y);
  }
}
export default Token;
