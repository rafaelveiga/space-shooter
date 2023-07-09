import { v4 as uuidv4 } from "uuid";
import { GameObject } from "../types/GameObject";

class Projectile implements GameObject {
  x: number = 0;
  y: number = 0;
  uuid: string;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.uuid = uuidv4();
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, 5, 5);

    this.y -= 5;

    if (this.y < 0) {
      this.remove();
    }
  }

  remove() {
    document.dispatchEvent(
      new CustomEvent("despawnGameObject", { detail: { uuid: this.uuid } })
    );
  }
}

export default Projectile;
