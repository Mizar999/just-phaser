import { GameObjects, Math, Physics, Scene, Types } from "phaser";

export class GameScene extends Scene {
    cursors: Types.Input.Keyboard.CursorKeys;
    leftScoreLabel: GameObjects.Text;
    rightScoreLabel: GameObjects.Text;
    ball: GameObjects.Arc;
    paddleLeft: GameObjects.Rectangle;
    paddleRight: GameObjects.Rectangle;
    paddleSpeed: number;
    leftScore: number;
    rightScore: number;
    aiSpeed: number;
    paddleRightVelocity: Math.Vector2;

    init(): void {
        this.paddleSpeed = 0.5;
        this.aiSpeed = 3;
        this.leftScore = 0;
        this.rightScore = 0;
        this.paddleRightVelocity = new Math.Vector2(0, 0);
    }

    preload(): void {

    }

    create(): void {
        this.physics.world.setBounds(-100, 0, this.scale.width + 200, this.scale.height);

        this.ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);

        const bodyBall = this.ball.body as Physics.Arcade.Body;
        bodyBall.setCollideWorldBounds(true, 1, 1);
        bodyBall.setBounce(1, 1);
        this.resetBall();

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

        const scoreStyle = {
            fontSize: "48px"
        };

        this.leftScoreLabel = this.add.text(300, 125, "0", scoreStyle);
        this.leftScoreLabel.setOrigin(0.5, 0.5);

        this.rightScoreLabel = this.add.text(500, 375, "0", scoreStyle);
        this.rightScoreLabel.setOrigin(0.5, 0.5);

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
            this.paddleRight.y -= this.aiSpeed;
            body.updateFromGameObject();
        }
        else if (this.ball.y > this.paddleRight.y + offset) {
            this.paddleRight.y += this.aiSpeed;
            body.updateFromGameObject();
        }

        if (this.ball.x < -this.ball.radius) {
            // scored on the left side
            this.changeScore(0, 1);
            this.resetBall();
        }
        else if (this.ball.x > this.scale.width + this.ball.radius) {
            // scored on the right side
            this.changeScore(1, 0);
            this.resetBall();
        }
    }

    private changeScore(leftScore: number, rightScore: number): void {
        this.leftScore += leftScore;
        this.leftScoreLabel.text = this.leftScore.toString();
        this.rightScore += rightScore;
        this.rightScoreLabel.text = this.rightScore.toString();
    }

    private resetBall(): void {
        let angle: number;
        switch (Math.Between(0, 2)) {
            case 0:
                angle = Math.Between(10, 50);
            case 1:
                angle = Math.Between(130, 230);
            default:
                angle = Math.Between(310, 350);
        }

        const vector = this.physics.velocityFromAngle(angle, 200);
        this.ball.body.velocity.x = vector.x;
        this.ball.body.velocity.y = vector.y;
        this.ball.setPosition(this.scale.width / 2, this.scale.height / 2)
    }
}