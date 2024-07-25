class Level {
    items
    scene
    currentLevel
    currentTile
    tilsetArray = []
    tiles = []
    checkpoints

    map
    constructor(scene, level) {
        this.scene = scene;
        this.tiles = DATA.tiles
        this.createLevel(this.scene.currentLevel)

    }

    getAssets() {

    }


    createLevel(level) {
        this.map = this.scene.make.tilemap({ key: level });
        this.createTilsets()
        this.createLayers()
        this.createTraps(this.scene.trapsLayer);
        this.createItems(this.scene.pickupsLayer);
        this.createCheckpoints()
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
        const checkpointsLayer = this.map.getObjectLayer('checkpoints')

        this.scene.belowPlayer = belowPlayer;
        this.scene.worldLayer = worldLayer;
        this.scene.aboveLayer = aboveLayer;
        this.scene.trapsLayer = trapsLayer;
        this.scene.pickupsLayer = pickupsLayer;
        this.scene.checkpointsLayer = checkpointsLayer
        this.scene.map = this.map
        console.log(checkpointsLayer)
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
    createCheckpoints() {

   
        this.scene.checkpoints = this.scene.physics.add.group();
        this.scene.checkpointsLayer.objects.forEach(object => {
            console.log(object)
            let obj
            if (object.type === 'checkpoints') {

                // Erstelle ein animiertes Sprite
                obj = this.scene.add.sprite(object.x, object.y, this.getValueByName(object.properties,'type'));
                obj.setOrigin(0, 1); // Korrigiere die Position, falls nötig
                this.scene.anims.create({
                    key: this.getValueByName(object.properties,'type'),
                    frames: this.scene.anims.generateFrameNumbers(this.getValueByName(object.properties,'type'), { start: 0, end: 17 }),
                    frameRate: 20,
                    repeat: -1
                });
                obj.play(this.getValueByName(object.properties,'type'));
            }else{
                const obj = this.scene.checkpoints.create(object.x, object.y, this.getValueByName(object.properties,'type')); // Ersetze 'null' durch das passende Bild, falls nötig
                obj.setOrigin(0, 1); // Korrigiere die Position, falls nötig
                obj.body.setSize(object.width, object.height); // Setze die Größe des Kollisionskörpers
                obj.setImmovable(true); // Stelle sicher, dass das Objekt unbeweglich ist
                obj.body.allowGravity = false
            }
  
        
        });

    }

    getValueByName(properties, name) {
        for (let i = 0; i < properties.length; i++) {
            if (properties[i].name === name) {
                return properties[i].value;
            }
        }
        return null; // Oder eine andere geeignete Rückgabe, wenn der Name nicht gefunden wird
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
