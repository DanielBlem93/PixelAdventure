class Level {
    scene
    items
    currentLevel
    constructor(scene, level) {
        this.scene = scene;
        this.currentLevel = level
    }

    create() {

        this.createWorldlayers(this.currentLevel)
        this.item = new Item(this.scene)
    }

    createWorldlayers(level) {
        const map = this.scene.make.tilemap({ key: level });
        const tileset = map.addTilesetImage('Terrain', 'Terrain');
        const Hintergrund2 = map.addTilesetImage('Hintergrund2', 'Hintergrund2');
        const appes = map.addTilesetImage('apple', 'apple');
        const bellowLayer = map.createLayer('belowPlayer', Hintergrund2, 0, 0);
        const worldLayer = map.createLayer('worldLayer', tileset, 0, 0);
        const aboveLayer = map.createLayer('abovePlayer', tileset, 0, 0);
        const pickupsLayer = map.createLayer('pickups', tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        this.scene.worldLayer = worldLayer


        // this.addDebugColors(worldLayer)



        this.createItems(pickupsLayer)

    }


    createItems(pickupsLayer) {
        this.items = this.scene.physics.add.group()
        const item = new Item(this.scene);
        pickupsLayer.forEachTile(tile => {
            if (tile.index !== -1) {
                item.createItems(tile);
            }
        });
        item.createItemAnimations()
        item.playItemsAnimation()
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
