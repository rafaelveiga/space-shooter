import { GameObject } from "../types/GameObject";

class Ship implements GameObject {
  x: number = 0;
  y: number = 0;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    console.log("Ship constructor");
    this.ctx = ctx;
  }

  update() {
    console.log("Ship update");
  }

  draw() {
    console.log("Ship jdraw");
  }
}

export default Ship;
