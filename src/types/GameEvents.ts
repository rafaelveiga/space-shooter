import Enemy from "../GameObjects/Enemy";
import Projectile from "../GameObjects/Projectile";

export interface EnemySpawnedEventDetail {
  enemy: Enemy;
}

export interface ProjectileSpawnedEventDetail {
  projectile: Projectile;
}
