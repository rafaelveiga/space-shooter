import { GameObject } from "../types/GameObject";

class Enemy implements GameObject {
  x: number = 0;
  y: number = 0;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, 20, 20);
  }
}

export default Enemy;
