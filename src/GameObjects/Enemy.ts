import { GAME_WIDTH } from "../constants";
import { Frames } from "../types/Frames";
import { GameObject } from "../types/GameObject";
import { v4 as uuidv4 } from "uuid";
import enemyImage from "../assets/enemy1.png";

class Enemy implements GameObject {
  x: number = 0;
  y: number = 0;
  type: "enemy" = "enemy";
  uuid: string;
  ENEMY_WIDTH: number = 16;
  ENEMY_HEIGHT: number = 16;
  direction: number = 1;
  ctx: CanvasRenderingContext2D;

  frames: Frames;
  image: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.uuid = uuidv4();

    this.frames = {
      max: 4,
      elapsed: 0,
      hold: 10,
    };

    this.image = new Image();
    this.image.src = enemyImage;
  }

  update(tick: number) {
    this.draw(tick);
    this.move();
  }

  draw(tick: number) {
    const crop = {
      position: {
        x: this.frames.elapsed * this.ENEMY_WIDTH,
        y: 0,
      },
      width: this.ENEMY_WIDTH,
      height: this.ENEMY_HEIGHT,
    };

    this.ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.x,
      this.y,
      this.ENEMY_WIDTH,
      this.ENEMY_HEIGHT
    );

    this.frames.elapsed += 1;

    if (this.frames.elapsed > this.frames.max) {
      this.frames.elapsed = 0;
    }
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
