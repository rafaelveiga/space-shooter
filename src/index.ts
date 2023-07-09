import Ship from "./GameObjects/Ship";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
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

    this.setupCanvas();

    this.animate();
  }

  setupCanvas() {
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
  }

  animate() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });
    requestAnimationFrame(this.animate.bind(this));
  }
}

interface IGame {
  gameObjects: GameObject[];
  animate(): void;
  setupCanvas(): void;
}

const game: Game = new Game();
