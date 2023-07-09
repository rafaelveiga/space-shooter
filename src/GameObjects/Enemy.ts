import { GAME_WIDTH } from "../constants";
import { GameObject } from "../types/GameObject";
import { v4 as uuidv4 } from "uuid";

class Enemy implements GameObject {
  x: number = 0;
  y: number = 0;
  type: "enemy" = "enemy";
  uuid: string;
  ENEMY_WIDTH: number = 20;
  ENEMY_HEIGHT: number = 20;
  direction: number = 1;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.uuid = uuidv4();
  }

  update() {
    this.draw();
    this.move();
  }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, this.ENEMY_WIDTH, this.ENEMY_HEIGHT);
  }

  move() {
    this.x += 1 * this.direction;

    if (this.x > GAME_WIDTH - this.ENEMY_WIDTH - 50) {
      this.direction = -1;
    }

    if (this.x < 0 + 50) {
      this.direction = 1;
    }
  }

  remove() {
    document.dispatchEvent(
      new CustomEvent("despawnGameObject", { detail: { uuid: this.uuid } })
    );
  }
}

export default Enemy;
