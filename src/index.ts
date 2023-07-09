import EnemySpawner from "./GameObjects/EnemySpawner";
import Ship from "./GameObjects/Ship";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
import {
  DespawnGameObjectEventDetail,
  EnemySpawnedEventDetail,
  ProjectileSpawnedEventDetail,
} from "./types/GameEvents";
import { GameObject } from "./types/GameObject";

class Game implements IGame {
  gameObjects: GameObject[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  tick: number = 0;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.gameObjects = [
      new Ship(this.ctx),
      new EnemySpawner(this.ctx, this.tick),
    ];

    this.setupCanvas();
    this.listenToGameEvents();

    this.animate();
  }

  setupCanvas() {
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
  }

  animate() {
    this.tick++;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(this.tick);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  listenToGameEvents() {
    document.addEventListener(
      "spawnEnemy",
      (e: CustomEvent<EnemySpawnedEventDetail>) => {
        this.gameObjects.push(e.detail.enemy);
      }
    );

    document.addEventListener(
      "spawnProjectile",
      (e: CustomEvent<ProjectileSpawnedEventDetail>) => {
        this.gameObjects.push(e.detail.projectile);
      }
    );

    document.addEventListener(
      "despawnGameObject",
      (e: CustomEvent<DespawnGameObjectEventDetail>) => {
        console.log(e);
        this.gameObjects = this.gameObjects.filter(
          (gameObject) => gameObject.uuid !== e.detail.uuid
        );
      }
    );
  }
}

interface IGame {
  gameObjects: GameObject[];
  animate(): void;
  setupCanvas(): void;
  listenToGameEvents(): void;
}

declare global {
  interface DocumentEventMap {
    spawnEnemy: CustomEvent<EnemySpawnedEventDetail>;
    spawnProjectile: CustomEvent<ProjectileSpawnedEventDetail>;
    despawnGameObject: CustomEvent<DespawnGameObjectEventDetail>;
  }
}

const game: Game = new Game();
