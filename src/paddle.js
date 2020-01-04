export default class Paddle {
  constructor(gameObj) {
    this.gameHeight = gameObj.gameHeight;
    this.gameWidth = gameObj.gameWidth;
    this.width = 150;
    this.height = 20;

    this.speed = 0;
    this.maxSpeed = 6;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 5
    };
  }

  moveLeft() {
    // For moving the paddle at same speed (For fast this.speed -= this.speed)
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    // For moving the paddle at same speed
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#02fda4";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    //if (!deltaTime) return; // no need of this line, if we use requestAnimationFrame to call gameLoop

    //this.position.x += 5 / deltaTime; moving right 5px for each sec
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;

    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
