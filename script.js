const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasDimension = {
  x: 1280,
  y: 720
};

canvas.width = canvasDimension.x;
canvas.height = canvasDimension.y;

class Player {
  constructor(game) {
    this.game = game;
    this.colX = this.game.width * 0.5;
    this.colY = this.game.height * 0.5;
    this.colRadius = 30;
    this.speedX = 0
    this.speedY = 0
    this.dx
    this.dy
    this.speedModifier = 10
  }

  draw(context) {
    context.beginPath();
    context.arc(this.colX,this.colY,this.colRadius,0,Math.PI * 2);
    context.fill();
    ctx.moveTo(this.colX, this.colY)
    ctx.lineTo(this.game.mouse.x, this.game.mouse.y)
    ctx.stroke()
  }

  update() {
    this.dx = this.game.mouse.x - this.colX
    this.dy = this.game.mouse.y - this.colY
    const distance = Math.hypot(this.dy, this.dx)

    if(distance > this.speedModifier) {
      this.speedX = this.dx / distance || 0
      this.speedY = this.dy / distance || 0
    } else {
      this.speedX = 0
      this.speedY = 0
    }
    
    this.colX += this.speedX * this.speedModifier
    this.colY += this.speedY * this.speedModifier
  }
}

class Obstacle {
  constructor(game) {
    this.game = game
    this.colX = Math.random() * this.game.width
    this.colY = Math.random() * this.game.height
    this.colRadius = 80
  }

  draw(context) {
    context.beginPath();
    context.arc(this.colX,this.colY,this.colRadius,0,Math.PI * 2);
    context.fill();
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.player = new Player(this);
    this.numOfObstacle = 10
    this.obstacle = []
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false
    };

    canvas.addEventListener("mouseup", (e) => {
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY
      this.pressed = false
    });

    canvas.addEventListener("mousedown", (e) => {
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY
      this.pressed = true
    });

    canvas.addEventListener("mousemove", (e) => {
      if(this.pressed) {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
      }
    });
  }

  render(context) {
    this.player.draw(context);
    this.player.update()
    this.obstacle.forEach(ob => ob.draw(context))
  }

  init() {
    // for(let i = 0; i < this.numOfObstacle; i++){
    //   this.obstacle.push(new Obstacle(this))
    // }

    let attempts = 0
    while (this.obstacle.length < this.numOfObstacle && attempts < 50) {
      let testObstacle = new Obstacle(this)
      let overlap = false
      this.obstacle.forEach(ob => {
        const dx = testObstacle.colX - ob.colX
        const dy = testObstacle.colY - ob.colY

        const distance = Math.hypot(dy, dx)
        const sumOfRadii = testObstacle.colRadius + ob.colRadius

        if(distance < sumOfRadii) {
          overlap = true
        }
      })
      // this.obstacle.push(new Obstacle(this))
      if(!overlap) {
        this.obstacle.push(testObstacle)
      }
      attempts++
    }
  }
}

const game = new Game(canvas);
game.init()

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render(ctx);
  requestAnimationFrame(animate);
};

animate();
