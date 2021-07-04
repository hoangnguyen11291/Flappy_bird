const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let birdImg = new Image();
let backGround = new Image();
let upperTube = new Image();
let lowerTube = new Image();

birdImg.src = "images/bird.png";
backGround.src = "images/background.png";
upperTube.src = "images/uppertube.png";
lowerTube.src = "images/lowertube.png";

let score = 0;
let playerName = [];
let tubeDitance = 180;
let lowerTubeDistance;

let bird = {
  x: backGround.width / 5.5,
  y: backGround.height / 2,
};

let tube = [];
tube[0] = {
  x: canvas.width,
  y: 0,
};

function restart() {
  document.location.href = "";
}
function getPlayerName() {
  document.addEventListener("keydown", function (event) {
    value = event.target.value;
    console.log("this is" + value);
    document.getElementById("PlayerName").innerHTML = "Player Name: " + value;
  });
}
function game() {
  ctx.drawImage(backGround, 0, 0);
  ctx.drawImage(birdImg, bird.x, bird.y);

  for (let i = 0; i < tube.length; i++) {
    lowerTubeDistance = upperTube.height + tubeDitance;
    ctx.drawImage(upperTube, tube[i].x, tube[i].y);
    ctx.drawImage(lowerTube, tube[i].x, tube[i].y + lowerTubeDistance);

    tube[i].x -= 5;

    if (tube[i].x == canvas.width / 2) {
      tube.push({
        x: canvas.width,
        y: Math.floor(Math.random() * upperTube.height) - upperTube.height,
      });
    }
    if (tube[i].x == 0) score++;

    if (tube[i].x == 0) tube.splice(0, 1);

    if (
      bird.y + birdImg.height == canvas.height ||
      (bird.x + birdImg.width >= tube[i].x &&
        bird.x <= tube[i].x + upperTube.width &&
        (bird.y <= tube[i].y + upperTube.height ||
          bird.y + birdImg.height >= tube[i].y + lowerTubeDistance))
    ) {
      // alert("Game over! Your Score:", score);
      return;
    }
  }
  document.getElementById("score").innerHTML = "Score: " + score;
  bird.y += 3;
  requestAnimationFrame(game);
}

document.addEventListener("mousedown", function () {
  bird.y -= 80;
});
document.addEventListener("keydown", function () {
  bird.y -= 80;
});

game();
