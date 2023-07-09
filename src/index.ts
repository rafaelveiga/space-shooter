import Ship from "./GameObjects/Ship";
import { GameObject } from "./types/GameObject";

class Game implements IGame {
  gameObjects: GameObject[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    console.log("Game constructor");
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.gameObjects = [new Ship(this.ctx)];

    this.animate();
  }

  animate() {
    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });
    requestAnimationFrame(this.animate.bind(this));
  }
}

interface IGame {
  gameObjects: GameObject[];
  animate(): void;
}

const game: Game = new Game();
