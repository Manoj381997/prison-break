export default class InputHandler {
  constructor(paddle, gameObj) {
    // For moving the paddle right & left
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 39:
          paddle.moveRight();
          break;
        case 37:
          paddle.moveLeft();
          break;
        case 27:
          gameObj.togglePause();
          break;
        case 32:
          gameObj.start();
          break;
        default:
          break;
      }
    });

    // For stopping the paddle when the button is released
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
