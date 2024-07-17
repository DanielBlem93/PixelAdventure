class Level {
    items
    scene
    currentLevel
    constructor(scene, level) {
        this.scene = scene;
        this.currentLevel = level
    }

    create() {

        this.createLevel(this.currentLevel)

    }

    createLevel(level) {
        const map = this.scene.make.tilemap({ key: level });
        
  
        const tilesetTerrain = map.addTilesetImage('Terrain', 'Terrain');
        const tilesetChain = map.addTilesetImage('trap_chain_horz', 'trap_chain_horz');
        const tilesetHintergrund2 = map.addTilesetImage('Hintergrund2', 'Hintergrund2');
       
        const bellowLayer = map.createLayer('belowPlayer', tilesetHintergrund2, 0, 0);
        const worldLayer = map.createLayer('worldLayer', [tilesetTerrain, tilesetChain], 0, 0); 
        const aboveLayer = map.createLayer('abovePlayer', tilesetTerrain, 0, 0);
        const trapsLayer = map.createLayer('traps', tilesetTerrain, 0, 0);
        const pickupsLayer = map.createLayer('pickups', tilesetTerrain, 0, 0);
    
        this.createTraps(trapsLayer);
        this.createItems(pickupsLayer);
       
        this.scene.worldLayer = worldLayer;
        this.scene.trapsLayer = trapsLayer;
        // this.addDebugColors(worldLayer);
    }

    createTraps(trapsLayer) {
        const traps = new Traps(this.scene)
  
        trapsLayer.forEachTile(tile => {
            if (tile.index !== -1) {
                traps.createTraps(tile)
            }
        })

        traps.playTrapsAnimation()
    }

    createItems(pickupsLayer) {
        const items = new Items(this.scene);
        pickupsLayer.forEachTile(tile => {
            if (tile.index !== -1) {
                items.createItems(tile);
            }
        });

        items.playItemsAnimation()

    }

    
    addDebugColors(worldLayer) {
        const debugGraphics = this.scene.add.graphics().setAlpha(0.5);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 255, 50, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
    }

}
