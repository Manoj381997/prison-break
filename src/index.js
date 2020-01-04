import Game from "./game";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_HEIGHT = 700;
const GAME_WIDTH = 1000;

let game = new Game(GAME_HEIGHT, GAME_WIDTH);

let lastTime = 0;

// getting images from index.html via ID's
//let brick = document.getElementById("brick");

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime; // how much time has passed
  lastTime = timeStamp; // current time stamp is assigned to last timestamp

  // ctx.clearRect(postion.x, position.y, width, height)  (format)
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // Clearing the game screen
  //game.gameInitInfo(ctx);
  game.draw(ctx);
  game.update(deltaTime);

  requestAnimationFrame(gameLoop); // when nxt frame is ready, calls gameLoop & passes current timestamp
}
requestAnimationFrame(gameLoop);
