import Vector from "./Vector";

import * as Constants from "../Utils/Constants";

class Camera {
  constructor(canvasWidth, canvasHeight, speed, position) {
    this.position = position !== undefined ? position : new Vector();
    this.speed = speed !== undefined ? speed : 5;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  moveCamera(direction) {
    this.position.x += direction.x * this.speed;
    this.position.y += direction.y * this.speed;
  }

  screenToRoundedWorldTile(screenPoint) {
    let worldTile = new Vector();

    worldTile.x = Math.floor(
      ((screenPoint.x + this.position.x - Constants.CANVAS_WIDTH / 2) /
        Constants.TILE_WIDTH_HALF +
        (screenPoint.y + this.position.y - Constants.CANVAS_HEIGHT / 4) /
          Constants.TILE_HEIGHT_HALF) /
        2
    );

    worldTile.y = Math.floor(
      ((screenPoint.y + this.position.y - Constants.CANVAS_HEIGHT / 4) /
        Constants.TILE_HEIGHT_HALF -
        (screenPoint.x + this.position.x - Constants.CANVAS_WIDTH / 2) /
          Constants.TILE_WIDTH_HALF) /
        2
    );
    return worldTile;
  }

  screenToWorldTile(screenPoint) {
    let worldTile = new Vector();

    worldTile.x =
      ((screenPoint.x + this.position.x - Constants.CANVAS_WIDTH / 2) /
        Constants.TILE_WIDTH_HALF +
        (screenPoint.y + this.position.y - Constants.CANVAS_HEIGHT / 4) /
          Constants.TILE_HEIGHT_HALF) /
      2;

    worldTile.y =
      ((screenPoint.y + this.position.y - Constants.CANVAS_HEIGHT / 4) /
        Constants.TILE_HEIGHT_HALF -
        (screenPoint.x + this.position.x - Constants.CANVAS_WIDTH / 2) /
          Constants.TILE_WIDTH_HALF) /
      2;

    return worldTile;
  }

  worldTileToScreen(pos) {
    return new Vector(
      (pos.x - pos.y) * Constants.TILE_WIDTH_HALF +
        this.canvasWidth / 2 -
        this.position.x,
      (pos.x + pos.y) * Constants.TILE_HEIGHT_HALF +
        this.canvasHeight / 4 -
        this.position.y
    );
  }
}
export default Camera;
