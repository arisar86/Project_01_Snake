class Snake {
  constructor() {
    this.positionX = 400;
    this.positionY = 300;
    this.width = 20;
    this.height = 20;
    this.step = 20; //distance snake moves per step
    this.createDomElement();
    this.setUpEventListeners();
    //this.moveConstant();
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
  setUpEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.moveLeft();
      } else if (e.code === "ArrowRight") {
        this.moveRight();
      } else if (e.code === "ArrowDown") {
        this.moveDown();
      } else if (e.code === "ArrowUp") {
        this.moveUp();
      }
    });
  }

  // movement of the snake

  /*moveConstant() {
    this.interval = setInterval(() => {
      this.updatePosition();
    }, 20);
  }*/

  updatePosition() {
    let div = document.getElementById("snake");
    div.style.left = this.positionX + "px";
    div.style.bottom = this.positionY + "px";
    if (
      snake.positionX < food.positionX + food.width &&
      snake.positionX + snake.width > food.positionX &&
      snake.positionY < food.positionY + food.height &&
      snake.positionY + snake.height > food.positionY
    ) {
      console.log("yummy");
      food.reposition();
    }
  }

  moveLeft() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.positionX -= this.step;
      this.updatePosition();
    }, 1000);
  }

  moveRight() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.positionX += this.step;
      this.updatePosition();
    }, 1000);
  }

  moveDown() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.positionY -= this.step;
      this.updatePosition();
    }, 1000);
  }

  moveUp() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.positionY += this.step;
      this.updatePosition();
    }, 1000);
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

const snake = new Snake();
const food = new Food();
