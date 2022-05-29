import { Types, Game, Core } from "phaser";
import { TitleScreen } from "./scenes/TitleScreen";
import { GameScene } from "./scenes/GameScene";

const config: Types.Core.GameConfig = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: "#616161",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
}

const game = new Game(config);
game.scene.add("titlescreen", TitleScreen);
game.scene.add("gamescene", GameScene);
// game.scene.start("titlescreen");
game.scene.start("gamescene");