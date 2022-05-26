import { Physics, Scene } from "phaser";

export class GameScene extends Scene {
    preload(): void {

    }

    create(): void {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(ball);
        const bodyBall = ball.body as Physics.Arcade.Body;
        bodyBall.setCollideWorldBounds(true, 1, 1);
        bodyBall.setBounce(1, 1);
        ball.body.velocity.x = -175;
        ball.body.velocity.y = 175;

        const paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(paddleLeft, true);
        const bodyPaddleLeft = paddleLeft.body as Physics.Arcade.StaticBody;
        bodyPaddleLeft.setMass(100);

        this.physics.add.collider(paddleLeft, ball);
    }
}