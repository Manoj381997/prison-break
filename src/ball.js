import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(gameObj) {
    this.gameWidth = gameObj.gameWidth;
    this.gameHeight = gameObj.gameHeight;
    this.gameObj = gameObj;
    this.ball = document.getElementById("ball");
    this.ballSize = 13;
    this.reset();
  }

  reset() {
    this.position = { x: this.gameWidth / 2, y: this.gameHeight / 2 };
    this.speed = { x: 1, y: 3 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.ball,
      this.position.x,
      this.position.y,
      this.ballSize,
      this.ballSize
    );
  }

  update(deltaTime) {
    //console.log("x ="+this.gameObj.paddle.position.x);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left or right
    if (
      this.position.x + this.ballSize > this.gameWidth ||
      this.position.x < 0
    ) {
      this.speed.x = -this.speed.x;
    }

    // wall on top or bottom
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.ballSize > this.gameHeight) {
      this.gameObj.numberOfLives--;
      this.gameObj.gameInfo();
      this.reset();
    }

    if (detectCollision(this, this.gameObj.paddle)) {
      this.speed.y = -this.speed.y;
      // For making the ball touch the paddle
      this.position.y = this.gameObj.paddle.position.y - this.ballSize;
    }
    // // check collision with the paddle
    // let bottomOfBall = this.position.y + this.ballSize;
    // let paddleTop = this.gameObj.paddle.position.y;
    // let leftSideOfPaddle = this.gameObj.paddle.position.x;
    // let rightSideOfPaddle =
    //   this.gameObj.paddle.position.x + this.gameObj.paddle.width;

    // if (
    //   bottomOfBall >= paddleTop &&
    //   this.position.x >= leftSideOfPaddle &&
    //   this.position.x + this.ballSize <= rightSideOfPaddle
    // ) {
    //   this.speed.y = -this.speed.y;
    //   // For making the ball touch the paddle
    //   this.position.y = this.gameObj.paddle.position.y - this.ballSize;
    // }
  }
}
