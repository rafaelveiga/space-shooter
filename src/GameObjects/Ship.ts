import { GAME_HEIGHT, GAME_WIDTH } from "../constants";
import { GameObject } from "../types/GameObject";
import Projectile from "./Projectile";

class Ship implements GameObject {
  x: number = GAME_WIDTH / 2;
  y: number = 500;
  ctx: CanvasRenderingContext2D;
  type: "player" = "player";
  SHIP_WIDTH: number = 40;
  SHIP_HEIGHT: number = 40;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.x > 0) {
            this.x -= 10;
          }
          break;
        case "ArrowRight":
          if (this.x + this.SHIP_WIDTH < GAME_WIDTH) {
            this.x += 10;
          }
          break;
        case "ArrowUp":
          if (this.y > 0) {
            this.y -= 10;
          }
          break;
        case "ArrowDown":
          if (this.y + this.SHIP_HEIGHT < GAME_HEIGHT) {
            this.y += 10;
          }
          break;
        case " ":
          this.spawnProjectile();
          break;
      }
    });
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.SHIP_WIDTH, this.SHIP_HEIGHT);
  }

  spawnProjectile() {
    document.dispatchEvent(
      new CustomEvent("spawnProjectile", {
        detail: {
          projectile: new Projectile(this.ctx, this.x, this.y),
        },
      })
    );
  }

  remove() {
    // do nothing
  }
}

export default Ship;
