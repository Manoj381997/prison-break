import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import Mario from "/src/mario.js";
import { buildLevel, level1, level2 } from "./level";

const GAMESTATE = {
  RUNNING: 1,
  PAUSED: 0,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameHeight, gameWidth) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;

    this.gameState = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.mario = new Mario(this, { x: this.gameWidth / 2 - 20, y: 8 });

    new InputHandler(this.paddle, this);
    this.numberOfLives = 3;

    this.gameObjects = [];
    this.bricks = [];

    this.levels = [level1, level2];
    this.currentLevelindex = 0;
    this.time = 0;
    this.gameInfo();
  }

  gameTimer() {
    // let gameTime = document.getElementById("gameTimer");
    // let timer = document.createElement("h5");
    // timer.id = "timer";
    // timer.appendChild(document.createTextNode("Time Taken: 0 sec"));
    // gameTime.appendChild(timer);

    let time = document.getElementById("time");
    this.timer = setInterval(() => {
      // If the gameState is Paused, the timer wont increse/decrase
      if (this.gameState === GAMESTATE.RUNNING) this.time++;
      time.innerHTML = `${this.time}`;
      if (this.time === 240) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  start() {
    // to make sure only during MENU we can start the game
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL
    )
      return;

    //this.brick = new Brick(this, { x: 20, y: 20 });
    // load bricks
    this.bricks = buildLevel(this, this.levels[this.currentLevelindex]);
    this.ball.reset();

    this.gameObjects = [this.ball, this.paddle, this.mario];

    if (this.gameState !== GAMESTATE.NEWLEVEL) this.gameTimer();

    this.gameState = GAMESTATE.RUNNING;
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  update(deltaTime) {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;

    if (this.mario.markedForVictory) {
      this.currentLevelindex++;
      this.mario.markedForVictory = false;
      this.gameState = GAMESTATE.NEWLEVEL;
      this.gameInfo();
      this.start();
    }

    if (this.numberOfLives === 0 || this.time === 240) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    // for filtering bricks thats been touched by the ball
    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  gameInfo() {
    document.getElementById("ballLives").innerHTML = this.numberOfLives;
    document.getElementById("levelNo").innerHTML = this.currentLevelindex + 1;
  }
}
