import { GameObjects, Math, Physics, Scene, Types } from "phaser";

export class GameScene extends Scene {
    cursors: Types.Input.Keyboard.CursorKeys;
    ball: GameObjects.Arc;
    paddleLeft: GameObjects.Rectangle;
    paddleRight: GameObjects.Rectangle;
    paddleSpeed: number;
    paddleRightVelocity: Math.Vector2;

    init(): void {
        this.paddleSpeed = 0.5;
        this.paddleRightVelocity = new Math.Vector2(0, 0);
    }

    preload(): void {

    }

    create(): void {
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);

        const bodyBall = this.ball.body as Physics.Arcade.Body;
        bodyBall.setCollideWorldBounds(true, 1, 1);
        bodyBall.setBounce(1, 1);
        this.ball.body.velocity.x = Phaser.Math.Between(-200, 200);
        this.ball.body.velocity.y = Phaser.Math.Between(-200, 200);

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time: number, delta: number): void {
        let body = this.paddleLeft.body as Physics.Arcade.StaticBody;
        if (this.cursors.up.isDown) {
            this.paddleLeft.y -= this.paddleSpeed * delta;
            body.updateFromGameObject();
        }
        else if (this.cursors.down.isDown) {
            this.paddleLeft.y += this.paddleSpeed * delta;
            body.updateFromGameObject();
        }

        body = this.paddleRight.body as Physics.Arcade.StaticBody;
        const offset = this.paddleRight.height / 2 - 2;

        if (this.ball.y < this.paddleRight.y - offset) {
            this.paddleRight.y -= 3;
            body.updateFromGameObject();
        }
        else if (this.ball.y > this.paddleRight.y + offset) {
            this.paddleRight.y += 3;
            body.updateFromGameObject();
        }
    }
}