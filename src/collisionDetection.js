export function detectCollision(ball, gameObject) {
  // check collision with the paddle / gameObject
  let bottomOfBall = ball.position.y + ball.ballSize;
  let topOfBall = ball.position.y;

  let topOfGameObject = gameObject.position.y;
  let leftSideOfGameObject = gameObject.position.x;
  let rightSideOfGameObject = gameObject.position.x + gameObject.width;
  let bottomOfGameObject = gameObject.position.y + gameObject.height;

  // if (!this.gameObject.markedForVictory) console.log("False - Not hit");
  // if (gameObject.markedForVictory !== undefined)
  //   console.log(gameObject.markedForVictory);

  if (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfGameObject &&
    ball.position.x >= leftSideOfGameObject &&
    ball.position.x + ball.ballSize <= rightSideOfGameObject
  ) {
    return true;
  } else {
    return false;
  }
}
