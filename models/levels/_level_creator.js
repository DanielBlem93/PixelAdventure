class Level {
    items
    scene
    currentLevel
    currentTile
    tilsetArray = []
    tiles = []


    map
    constructor(scene, level) {
        this.scene = scene;
        this.tiles = DATA.tiles
        this.createLevel(this.scene.currentLevel)

    }

    getAssets(){

    }


    createLevel(level) {
        this.map = this.scene.make.tilemap({ key: level });
        this.createTilsets()
        this.createLayers()
        this.createTraps(this.scene.trapsLayer);
        this.createItems(this.scene.pickupsLayer);
    }

    createTilsets() {

        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            const currentTile = this.map.addTilesetImage(tile, tile)//'Terrain', Terrain

            if (currentTile) {
                this.tilsetArray.push(currentTile)
            }
        }
    }

    createLayers() {
        const belowPlayer = this.map.createLayer('belowPlayer', this.tilsetArray);
        const worldLayer = this.map.createLayer('worldLayer', this.tilsetArray);
        const aboveLayer = this.map.createLayer('abovePlayer', this.tilsetArray);
        const trapsLayer = this.map.createLayer('traps', this.tilsetArray);
        const pickupsLayer = this.map.createLayer('pickups', this.tilsetArray);

        this.scene.belowPlayer = belowPlayer;
        this.scene.worldLayer = worldLayer;
        this.scene.aboveLayer = aboveLayer;
        this.scene.trapsLayer = trapsLayer;
        this.scene.pickupsLayer = pickupsLayer;
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
        const debugGraphics = this.scene.add.graphics().setAlpha(1);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: new Phaser.Display.Color(0, 0, 0, 0),
            collidingTileColor: new Phaser.Display.Color(255, 255, 50, 255),
            faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        });
    }




}
