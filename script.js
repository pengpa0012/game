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
  }

  draw(context) {
    context.beginPath()
    context.arc(100, 100, 20, 0, Math.PI * 2)
    context.fill()
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.player = new Player(this)
  }

  render(context) {
    this.player.draw(context)
  }
}

const game = new Game(canvas)
game.render(ctx)