import { Scene } from "phaser";

export class TitleScreen extends Scene {
    preload(): void {
        
    }

    create(): void {
        const text = this.add.text(400, 250, "Hello World!");
        text.setOrigin(0.5, 0.5);
    }
}