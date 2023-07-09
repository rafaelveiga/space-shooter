import { v4 as uuidv4 } from "uuid";
import { GameObject } from "../types/GameObject";
import { Frames } from "../types/Frames";
import projectileImage from "../assets/projectile.png";

class Projectile implements GameObject {
  x: number = 0;
  PROJECTILE_HEIGHT: number = 16;
  PROJECTILE_WIDTH: number = 16;
  y: number = 0;
  uuid: string;
  type: "projectile" = "projectile";
  ctx: CanvasRenderingContext2D;

  frames: Frames;
  image: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.uuid = uuidv4();

    this.image = new Image();
    this.image.src = projectileImage;

    this.frames = {
      max: 8,
      elapsed: 0,
    };
  }

  update() {
    this.draw();
  }

  draw() {
    const crop = {
      position: {
        x: this.frames.elapsed * this.PROJECTILE_WIDTH,
        y: 0,
      },
      width: this.PROJECTILE_WIDTH,
      height: this.PROJECTILE_HEIGHT,
    };

    this.ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.x,
      this.y,
      this.PROJECTILE_WIDTH,
      this.PROJECTILE_HEIGHT
    );

    this.y -= 5;
    this.frames.elapsed += 1;

    if (this.frames.elapsed >= this.frames.max) {
      this.frames.elapsed = 0;
    }

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
