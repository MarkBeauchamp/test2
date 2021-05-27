import React, { Component } from "react";
import Sketch from "react-p5";
import MouseController, { mouseEvents } from "../Controllers/MouseController";
import Map from "../Drawing/Map";
import * as Constants from "../Utils/Constants";
import KeyboardController, {
  keyboardEvents
} from "../Controllers/KeyboardController";
import ImageStore from "../Assets/ImageStore";

class MapEditor extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.draw = this.draw.bind(this);
    this.setup = this.setup.bind(this);
  }
  preload(p5) {
    ImageStore.loadImages(p5);
  }

  setup(p5, canvasParentRef) {
    this.map = new Map(
      Constants.GRID_WIDTH,
      Constants.GRID_HEIGHT,
      Constants.CANVAS_WIDTH,
      Constants.CANVAS_HEIGHT
    );

    p5.createCanvas(Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT).parent(
      canvasParentRef
    );
  }

  draw(p5) {
    p5.background(220);
    this.map.draw(p5);
    KeyboardController.handleKeyInput(p5);
  }

  render() {
    let mouseFuncs = {};
    let keyboardFuncs = {};

    mouseEvents.forEach(
      (item) =>
        (mouseFuncs = {
          ...mouseFuncs,
          [item]: (event) => MouseController.handleMouseEvent(item, event)
        })
    );

    keyboardEvents.forEach(
      (item) =>
        (keyboardFuncs = {
          ...keyboardFuncs,
          [item]: (event) => KeyboardController.handleKeyboardEvent(item, event)
        })
    );

    let elem = React.cloneElement(<Sketch />, {
      setup: this.setup,
      draw: this.draw,
      preload: this.preload,
      ...mouseFuncs,
      ...keyboardFuncs
    });
    return <>{elem}</>;
  }
}

export default MapEditor;
