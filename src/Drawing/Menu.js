import Vector from "../Utils/Vector";
import * as Constants from "../Utils/Constants";

class Menu {
  constructor(position, width, height, title) {
    this.position = position || new Vector();
    this.width = width;
    this.height = height;
    this.title = title || "";
  }

  draw(p5) {
    p5.rect(this.position.x, this.position.y, this.width, this.height);
    p5.textSize(Constants.MENU_TITLE_FONT_SIZE);
    p5.fill(0);
    p5.textAlign(p5.CENTER);
    p5.text(
      this.title,
      this.position.x + this.width / 2,
      this.position.y + Constants.MENU_TITLE_OFFSET
    );
    p5.fill(255);
  }
}
export default Menu;
