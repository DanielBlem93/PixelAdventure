class PreloadAssets {
    scene

    constructor(scene) {
        this.scene = scene;
    }

    preload() {

        this.preloadPlayerSheets()
        this.preloadTerrainAssets()
        this.preloadItems()
        this.preloadTraps()
        //particles
        this.scene.load.image('dust', 'assets/Other/Dust Particle.png')
    }



    preloadPlayerSheets() {
        // Player spritesheets
        this.scene.load.spritesheet('player-walk', 'assets/Main Characters/Virtual Guy/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-jump', 'assets/Main Characters/Virtual Guy/Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-fall', 'assets/Main Characters/Virtual Guy/Fall (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-idle', 'assets/Main Characters/Virtual Guy/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-doubleJump', 'assets/Main Characters/Virtual Guy/Double Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-hit', 'assets/Main Characters/Virtual Guy/Hit (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('player-wallJump', 'assets/Main Characters/Virtual Guy/Wall Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
    }

    preloadTerrainAssets() {
        // Terrain assets 
        this.scene.load.image('Terrain', 'assets/terrain/terrain.png')
        this.scene.load.image('trap_chain_horz', 'assets/Traps/Platforms/chain_horz_16 x16.png')
        this.scene.load.image('Hintergrund2', 'assets/Background/Brown.png')
        this.scene.load.tilemapTiledJSON('level1', 'Tiled_data/testLevel.json')
    }

    preloadItems() {
        const fruitTypes = ['apple', 'bananas', 'cherries', 'kiwi', 'melon', 'orange', 'pineapple', 'strawberry'];        
        fruitTypes.forEach(fruitType => {
            this.scene.load.spritesheet(fruitType, `assets/Items/Fruits/${fruitType}.png`, { frameWidth: 32, frameHeight: 32 });
        });

    }

    preloadTraps(){
        this.scene.load.spritesheet('trap_falling_platform', 'assets/Traps/Falling Platforms/On (32x10).png', { frameWidth: 32, frameHeight: 10 });
        this.scene.load.spritesheet('trap_spikes', 'assets/Traps/Spikes/spike.png', { frameWidth: 16, frameHeight: 16 });
        this.scene.load.spritesheet('trap_trampoline', 'assets/Traps/Trampoline/Jump (28x28).png', { frameWidth: 28, frameHeight: 28 });
        this.scene.load.spritesheet('trap_moving_platform_auto', 'assets/Traps/Platforms/Grey On (32x8).png', { frameWidth: 32, frameHeight: 8 });

    }


}