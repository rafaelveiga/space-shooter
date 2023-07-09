import { EnemySpawnedEventDetail } from "../types/GameEvents";
import { GameObject } from "../types/GameObject";
import Enemy from "./Enemy";

class EnemySpawner implements GameObject {
  x: number = 0;
  y: number = 0;
  type: "enemySpawner" = "enemySpawner";
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
    return tick === 1 || tick % 100 === 0;
  }

  spawnEnemy() {
    document.dispatchEvent(
      new CustomEvent<EnemySpawnedEventDetail>("spawnEnemy", {
        detail: {
          enemy: new Enemy(this.ctx, 30, Math.random() * 200 + 50),
        },
      })
    );
  }

  remove() {
    // do nothing
  }
}

export default EnemySpawner;
