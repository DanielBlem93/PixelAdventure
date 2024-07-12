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
        const tileset = map.addTilesetImage('Terrain', 'Terrain');
        const Hintergrund2 = map.addTilesetImage('Hintergrund2', 'Hintergrund2');
        const bellowLayer = map.createLayer('belowPlayer', Hintergrund2, 0, 0);
        const worldLayer = map.createLayer('worldLayer', tileset, 0, 0);
        const aboveLayer = map.createLayer('abovePlayer', tileset, 0, 0);
        const trapsLayer = map.createLayer('traps', tileset, 0, 0);
        const pickupsLayer = map.createLayer('pickups', tileset, 0, 0);
;
        this.createTraps(trapsLayer)
        this.createItems(pickupsLayer)
   
        this.scene.worldLayer = worldLayer
        this.scene.trapsLayer = trapsLayer
        // this.addDebugColors(worldLayer)

        console.log(this.scene)
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
