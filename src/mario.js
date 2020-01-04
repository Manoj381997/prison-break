import { detectCollision } from "./collisionDetection";

export default class Mario {
  constructor(gameObj, position) {
    this.gameWidth = gameObj.gameWidth;
    this.gameHeight = gameObj.gameHeight;
    this.gameObj = gameObj;
    this.mario = document.getElementById("mario");
    this.position = position;
    this.width = 40;
    this.height = 50;
    this.markedForVictory = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.mario,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (detectCollision(this.gameObj.ball, this)) {
      this.markedForVictory = true;
    }
  }
}
