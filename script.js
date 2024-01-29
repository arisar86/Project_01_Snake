class Snake {
  constructor() {
    this.positionX = 400;
    this.positionY = 300;
    this.width = 20;
    this.height = 20;
    this.step = 20; //distance snake moves per step
    this.createDomElement();
  }
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

  moveConstant() {
    setInterval(() => {
      this.moveRight();
      this.updatePosition();
    }, 1000);
  }

  updatePosition() {
    let div = document.getElementById("snake");
    div.style.left = this.positionX + "px";
    div.style.bottom = this.positionY + "px";
  }

  moveLeft() {
    this.positionX -= this.step;
  }

  moveRight() {
    this.positionX += this.step;
  }

  moveDown() {
    this.positionY -= this.step;
  }

  moveUp() {
    this.positionY += this.step;
  }
}

const snake = new Snake();
snake.moveConstant();
