export interface GameObject {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  update(): void;
}
