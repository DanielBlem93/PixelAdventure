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
        this.preloadBackgrounds()
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
        this.scene.load.image('terrain', 'assets/terrain/terrain_black.png')
        this.scene.load.image('trap_chain_horz', 'assets/Traps/Platforms/chain_horz_16 x16.png')
        this.scene.load.tilemapTiledJSON('debug_level', 'Tiled_data/testLevel.json')
        this.scene.load.tilemapTiledJSON('menu', 'Tiled_data/PixVenture.json')
    }


    preloadBackgrounds() {
        const imgTypes = ['Blue', 'Brown', 'Gray', 'Green', 'Pink', 'Purple', 'Yellow'];
        imgTypes.forEach(imgType => {
            this.scene.load.image(`background_${imgType}`, `assets/Background/${imgType}.png`);
        });

    }

    preloadItems() {
        const fruitTypes = ['apple', 'bananas', 'cherries', 'kiwi', 'melon', 'orange', 'pineapple', 'strawberry'];
        fruitTypes.forEach(fruitType => {
            this.scene.load.spritesheet(fruitType, `assets/Items/Fruits/${fruitType}.png`, { frameWidth: 32, frameHeight: 32 });
        });

        this.scene.load.spritesheet('checkpoint_start', `assets/Items/Checkpoints/Start/Start (Moving) (64x64).png`, { frameWidth: 64, frameHeight: 64 });
        this.scene.load.spritesheet('checkpoint_end', `assets/Items/Checkpoints/End/End (Pressed) (64x64).png`, { frameWidth: 64, frameHeight: 64 });

    }

    preloadTraps() {
        this.scene.load.spritesheet('trap_falling_platform', 'assets/Traps/Falling Platforms/On (32x10).png', { frameWidth: 32, frameHeight: 10 });
        this.scene.load.spritesheet('trap_spikes', 'assets/Traps/Spikes/spike.png', { frameWidth: 16, frameHeight: 16 });
        this.scene.load.spritesheet('trap_trampoline', 'assets/Traps/Trampoline/Jump (28x28).png', { frameWidth: 28, frameHeight: 28 });
        this.scene.load.spritesheet('trap_moving_platform_auto', 'assets/Traps/Platforms/Grey On (32x8).png', { frameWidth: 32, frameHeight: 8 });

    }


}