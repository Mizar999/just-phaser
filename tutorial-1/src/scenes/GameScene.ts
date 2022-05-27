import { GameObjects, Physics, Scene, Types } from "phaser";

export class GameScene extends Scene {
    cursors: Types.Input.Keyboard.CursorKeys;
    paddleLeft: GameObjects.Rectangle;
    paddleSpeed: number;

    preload(): void {

    }

    create(): void {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(ball);

        const bodyBall = ball.body as Physics.Arcade.Body;
        bodyBall.setCollideWorldBounds(true, 1, 1);
        bodyBall.setBounce(1, 1);
        ball.body.velocity.x = -200;
        ball.body.velocity.y = 0;

        this.paddleSpeed = 0.5;
        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.physics.add.collider(this.paddleLeft, ball);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time: number, delta: number): void {
        const bodyPaddleLeft = this.paddleLeft.body as Physics.Arcade.StaticBody;
        if (this.cursors.up.isDown) {
            this.paddleLeft.y -= this.paddleSpeed * delta;
            bodyPaddleLeft.updateFromGameObject();
        }
        else if (this.cursors.down.isDown) {
            this.paddleLeft.y += this.paddleSpeed * delta;
            bodyPaddleLeft.updateFromGameObject();
        }
    }
}