import { EnemySpawnedEventDetail } from "../types/GameEvents";
import { GameObject } from "../types/GameObject";
import Enemy from "./Enemy";

class EnemySpawner implements GameObject {
  x: number = 30;
  y: number = 30;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, tick: number) {
    this.ctx = ctx;
  }

  update(tick: number) {
    if (this.shouldSpawnEnemy(tick)) {
      this.spawnEnemy();
    }
  }

  shouldSpawnEnemy(tick: number): boolean {
    return tick === 1 || tick % 300 === 0;
  }

  spawnEnemy() {
    document.dispatchEvent(
      new CustomEvent<EnemySpawnedEventDetail>("spawnEnemy", {
        detail: {
          enemy: new Enemy(this.ctx, this.x, this.y),
        },
      })
    );
  }
}

export default EnemySpawner;
