//global elements
let score = 0;
let boardElement;

class Snake {
  constructor() {
    this.positionX = 400;
    this.positionY = 300;
    this.width = 20;
    this.height = 20;
    this.step = 20; //distance snake moves per step
    this.previousDuration = 500;
    this.createDomElement();
    this.setUpEventListeners();
    this.displayScore();
    this.currentDirection = null;
  }

  //create the DOM Element
  createDomElement() {
    //create the element
    this.domElement = document.createElement("div");

    //ad content
    this.domElement.setAttribute("id", "snake");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";

    //append to the dom
    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }

  //event listeners

  //moving the snake
  setUpEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.move("left");
      } else if (e.code === "ArrowRight") {
        this.move("right");
      } else if (e.code === "ArrowDown") {
        this.move("down");
      } else if (e.code === "ArrowUp") {
        this.move("up");
      }
    });
  }
  //collision detection
  updatePosition() {
    let div = document.getElementById("snake");
    div.style.left = this.positionX + "px";
    div.style.bottom = this.positionY + "px";
    //collision with food
    if (
      snake.positionX < food.positionX + food.width &&
      snake.positionX + snake.width > food.positionX &&
      snake.positionY < food.positionY + food.height &&
      snake.positionY + snake.height > food.positionY
    ) {
      console.log("yummy");
      food.reposition();
      this.updateScore();
      this.previousDuration -= 50; // increase speed after scoring
    }
    //collision with board
    else if (
      snake.positionX < -10 ||
      snake.positionX >= 790 ||
      snake.positionY < -10 ||
      snake.positionY >= 590
    ) {
      this.resetScore(); //reseting score to 0
      this.positionX = 400; //reseting position of snake
      this.positionY = 300;
      this.step = 20;
      this.currentDirection = null;
      this.previousDuration = 500;
    }
  }

  // movement of the snake

  move(direction) {
    clearInterval(this.interval);
    console.log(this.previousDuration);
    this.currentDirection = direction;
    this.interval = setInterval(() => {
      switch (this.currentDirection) {
        case "left":
          this.positionX -= this.step;
          break;
        case "right":
          this.positionX += this.step;
          break;
        case "down":
          this.positionY -= this.step;
          break;
        case "up":
          this.positionY += this.step;
          break;
        default:
          break;
      }
      this.updatePosition();
    }, Math.max(this.previousDuration, 50));
  }

  //scoring points

  displayScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
  }

  updateScore() {
    let scoreElement = document.getElementById("score");
    score++;
    scoreElement.textContent = "Score: " + score;
  }

  resetScore() {
    let scoreElement = document.getElementById("score");
    score = 0;
    scoreElement.textContent = "Score: " + score;
  }
}

class Food {
  constructor() {
    this.width = 20;
    this.height = 20;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");
    const boardElement = document.getElementById("board");

    this.domElement.setAttribute("id", "food");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";

    boardElement.appendChild(this.domElement);
    this.reposition();
  }
  reposition() {
    const boardElement = document.getElementById("board");
    const borderThickness = 20;
    // maximum positions to ensure the food stays within the board
    const maxX =
      (boardElement.offsetWidth - this.width - 2 * borderThickness) / 20 + 1;
    const maxY =
      (boardElement.offsetHeight - this.height - 2 * borderThickness) / 20 + 1;

    // random spawning of the food on the board

    this.positionX = Math.floor(Math.random() * maxX) * 20;
    this.positionY = Math.floor(Math.random() * maxY) * 20;

    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
  }
}

boardElement = document.getElementById("board");
const snake = new Snake();
const food = new Food();
