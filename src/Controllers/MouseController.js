export let mouseEvents = [
  "mouseClicked",
  "mouseMoved",
  "doubleClicked",
  "mousePressed",
  "mouseWheel",
  "mouseDragged",
  "mouseReleased"
];

class MouseController {
  constructor() {
    this.functionList = {};

    mouseEvents.forEach((item) => {
      this.functionList = { ...this.functionList, [item]: [] };
    });
  }

  handleMouseEvent(type, event) {
    this.functionList[type].forEach((func) => func(event));
  }

  registerCommand(type, func) {
    this.functionList[type].push(func);
  }
}
let mouseController = new MouseController();

export default mouseController;
