export let keyboardEvents = ["keyPressed"];

class KeyboardController {
  constructor() {
    this.functionList = {};

    keyboardEvents.forEach((item) => {
      this.functionList = { ...this.functionList, [item]: [] };
    });

    this.functionList = { ...this.functionList, isKeyDown: [] };
  }

  handleKeyInput(p5) {
    this.functionList.isKeyDown.forEach((item) => {
      if (p5.keyIsDown(item.charCode)) {
        item.func();
      }
    });
  }

  handleKeyboardEvent(type, event) {
    let key = event.keyCode;
    this.functionList[type].forEach(({ func, charCode }) => {
      if (charCode === key) func(event);
    });
  }

  registerCommand(type, func, charCode) {
    this.functionList[type].push({ func: func, charCode: charCode });
  }
}
let keyboardController = new KeyboardController();
export default keyboardController;
