import { detectCollision } from "./collisionDetection";

export default class Brick {
  constructor(gameObj, position) {
    this.gameWidth = gameObj.gameWidth;
    this.gameHeight = gameObj.gameHeight;
    this.gameObj = gameObj;
    this.brick = document.getElementById("brick");
    //this.brickSize = 13;
    this.position = position;
    this.width = 100;
    this.height = 30;

    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.brick,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (detectCollision(this.gameObj.ball, this)) {
      this.gameObj.ball.speed.y = -this.gameObj.ball.speed.y;

      this.markedForDeletion = true;
    }
  }
}
