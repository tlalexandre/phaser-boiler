import Phaser from "phaser";

const ENEMY_SPEED = 1 / 50000;
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, name, path) {
    super(scene, x, y, name, path);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.MapScene = scene;
    this.path = path;
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this.health = 50;
    this.currentHealth = 50;
    this.setTint(0xffffff);
  }

  preload() {
    this.MapScene.load.image("bird", "assets/images/bird.png");
  }

  damageTaken(damage) {
    this.currentHealth -= damage;
    const healthPercentage = this.currentHealth / this.health;

    if (healthPercentage < 0.75 && healthPercentage > 0.5) {
      this.setTint(0xff9999);
    } else if (healthPercentage < 0.5) {
      this.setTint(0xff0000);
    }
    if (this.currentHealth <= 0) {
      this.destroy();
    }
  }

  update(time, delta) {
    this.follower.t += ENEMY_SPEED * delta;
    this.path.getPoint(this.follower.t, this.follower.vec);

    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }
}
