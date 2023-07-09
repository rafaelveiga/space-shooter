export interface GameObject {
  x: number;
  y: number;
  type: "enemy" | "projectile" | "player" | "enemySpawner";
  ctx: CanvasRenderingContext2D;
  update(tick?: number): void;
  uuid?: string;
  remove(): void;
}
