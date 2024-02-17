class PreloadAssets {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {

    // Player spritesheets
        this.scene.load.spritesheet('player-walk', 'assets/Main Characters/Virtual Guy/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-jump', 'assets/Main Characters/Virtual Guy/Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-fall', 'assets/Main Characters/Virtual Guy/Fall (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-idle', 'assets/Main Characters/Virtual Guy/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
        // Terrain assets 
        this.scene.load.image('Terrain', 'assets/terrain/terrain.png')
        this.scene.load.image('Hintergrund2', 'assets/Background/Brown.png')
        this.scene.load.tilemapTiledJSON('map', 'Tiled_data/testLevel.json')
    }
}