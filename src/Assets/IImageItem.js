import Vector from "../Utils/Vector";

class IImageItem {
  constructor({ image, name, position, offset }) {
    this.image = image;
    this.name = name;
    this.position = position !== undefined ? position : new Vector();
    this.offset = offset ? offset : new Vector();
  }
}
export default IImageItem;
