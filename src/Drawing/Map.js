import Camera from "../Utils/Camera";
import Vector from "../Utils/Vector";
import KeyboardController from "../Controllers/KeyboardController";
import MouseController from "../Controllers/MouseController";
import { GRID_HEIGHT, GRID_WIDTH } from "../Utils/Constants";
import { log } from "../Utils/util";
import imageStore from "../Assets/ImageStore";
import Token from "../Assets/Token";

class Map {
  constructor(width, height, canvasWidth, canvasHeight) {
    this.width = width;
    this.height = height;
    this.selectedTile = new Vector();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.camera = new Camera(canvasWidth, canvasHeight, 5);
    this.isGridVisible = true;
    this.tokens = [];
    this.mouseSelector = { lastPos: null, token: null };
    let cleric = imageStore.getImage("Cleric");

    this.tokens.push(
      new Token({ ...cleric, offset: new Vector(-55, -115), locked: true })
    );

    KeyboardController.registerCommand(
      "isKeyDown",
      this.camera.moveCamera.bind(this.camera, new Vector(0, -1)),
      "W".charCodeAt(0)
    );
    KeyboardController.registerCommand(
      "isKeyDown",

      this.camera.moveCamera.bind(this.camera, new Vector(-1, 0)),
      "A".charCodeAt(0)
    );
    KeyboardController.registerCommand(
      "isKeyDown",
      this.camera.moveCamera.bind(this.camera, new Vector(0, 1)),
      "S".charCodeAt(0)
    );
    KeyboardController.registerCommand(
      "isKeyDown",
      this.camera.moveCamera.bind(this.camera, new Vector(1, 0)),
      "D".charCodeAt(0)
    );

    //Add keyboard command to toggle grid visibility
    KeyboardController.registerCommand(
      "keyPressed",
      () => {
        this.isGridVisible = !this.isGridVisible;
      },
      "Q".charCodeAt(0)
    );

    MouseController.registerCommand("mousePressed", (event) => {
      const { mouseX, mouseY } = event;

      this.mouseSelector.token = null;

      for (let tokenIndex in this.tokens) {
        const token = this.tokens[tokenIndex];
        const tokenPosition = token.getScreenPosition(this.camera);
        const width = token.image.width;
        const height = token.image.height;

        if (mouseX > tokenPosition.x && mouseX < tokenPosition.x + width) {
          if (mouseY > tokenPosition.y && mouseY < tokenPosition.y + height) {
            this.mouseSelector.token = token;
            this.mouseSelector.lastPos = this.camera.screenToWorldTile(
              new Vector(mouseX, mouseY)
            );
            return;
          }
        }
      }

      let selectedTile = this.camera.screenToRoundedWorldTile(
        new Vector(event.mouseX, event.mouseY)
      );
      this.selectedTile = selectedTile;
    });
    MouseController.registerCommand("mouseDragged", (event) => {
      const { mouseX, mouseY } = event;
      if (this.mouseSelector.token !== null) {
        const mouseWorldPos = this.camera.screenToWorldTile(
          new Vector(mouseX, mouseY)
        );
        const oldPos = this.mouseSelector.lastPos;

        const dx = mouseWorldPos.x - oldPos.x;
        const dy = mouseWorldPos.y - oldPos.y;

        this.mouseSelector.token.position.x += dx;
        this.mouseSelector.token.position.y += dy;

        this.mouseSelector.lastPos = mouseWorldPos;

        const selectedTile = this.mouseSelector.token.position.clone();
        selectedTile.x = Math.round(selectedTile.x);
        selectedTile.y = Math.round(selectedTile.y);
        this.selectedTile = selectedTile;
      }
    });

    MouseController.registerCommand("mouseReleased", (event) => {
      const token = this.mouseSelector.token;

      if (token !== null && token.locked === true) {
        token.position.x = Math.round(token.position.x);
        token.position.y = Math.round(token.position.y);

        this.selectedTile = token.position;
      }
    });
  }

  drawGrid(p5) {
    if (this.isGridVisible) {
      const centerTile = this.camera.screenToRoundedWorldTile(
        new Vector(this.canvasWidth / 2, this.canvasHeight / 2)
      );
      const top = centerTile.y - this.height / 2;
      const left = centerTile.x - this.width / 2;

      for (let lineIndex = top; lineIndex <= top + this.height; lineIndex++) {
        let v1 = this.camera.worldTileToScreen(new Vector(left, lineIndex));
        let v2 = this.camera.worldTileToScreen(
          new Vector(left + this.width, lineIndex)
        );

        p5.line(v1.x, v1.y, v2.x, v2.y);
      }

      for (let lineIndex = left; lineIndex <= left + this.width; lineIndex++) {
        let v1 = this.camera.worldTileToScreen(new Vector(lineIndex, top));
        let v2 = this.camera.worldTileToScreen(
          new Vector(lineIndex, top + this.height)
        );

        p5.line(v1.x, v1.y, v2.x, v2.y);
      }
    }
  }

  drawSelectedTile(p5) {
    let v1 = this.camera.worldTileToScreen(this.selectedTile);

    let v2 = this.camera.worldTileToScreen(
      new Vector(this.selectedTile.x + 1, this.selectedTile.y)
    );

    let v3 = this.camera.worldTileToScreen(
      new Vector(this.selectedTile.x + 1, this.selectedTile.y + 1)
    );

    let v4 = this.camera.worldTileToScreen(
      new Vector(this.selectedTile.x, this.selectedTile.y + 1)
    );

    p5.quad(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, v4.x, v4.y);
  }

  drawTokens(p5) {
    this.tokens.forEach((token) => token.draw(p5, this.camera));
  }

  draw(p5) {
    this.drawGrid(p5);
    this.drawSelectedTile(p5);
    this.drawTokens(p5);
  }
}
export default Map;
