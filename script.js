const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const canvasDimension = {
  x: 1280,
  y: 720
}

canvas.width = canvasDimension.x
canvas.height = canvasDimension.y

class Player {
  constructor(game) {
    this.game = game
    this.colX = this.game.width * 0.5
    this.colY = this.game.height * 0.5
    this.colRadius = 30
    this.x
    this.y
  }

  draw(context) {
    context.beginPath()
    context.arc(this.colX, this.colY, this.colRadius, 0, Math.PI * 2)
    context.fill()
  }

  update() {
    this.colX = this.game.mouse.x
    this.colY = this.game.mouse.y
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.player = new Player(this)
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5
    }

    window.addEventListener("keydown", (e) => {
      if(e.key == "a") {
        this.mouse.x -= 30 * 0.5
      }
      if(e.key == "d") {
        this.mouse.x += 30 * 0.5
      }
    })
  }

  render(context) {
    this.player.draw(context)
    this.player.update()
  }
}

const game = new Game(canvas)

const animate = () => {
  ctx.clearRect(0,0, canvas.width, canvas.height)
  game.render(ctx)
  requestAnimationFrame(animate)
}

animate()