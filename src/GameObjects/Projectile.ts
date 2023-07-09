import { GameObject } from "../types/GameObject";

class Projectile implements GameObject {
  x: number = 0;
  y: number = 0;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, 5, 5);
  }
}

export default Projectile;
