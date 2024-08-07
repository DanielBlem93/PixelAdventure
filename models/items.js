class Items {
    scene
    animationKeys
    itmes

    collisionWidth = 16
    collisionHeight = 18


    constructor(scene) {
        this.scene = scene;
        this.items = scene.physics.add.group();
        this.animationKeys = [];

    }

    createItems(tile) {

        let fruitType = tile.properties.kind;
        const x = tile.getCenterX();
        const y = tile.getCenterY() - 48;
        const pickup = this.items.create(x, y, fruitType);

        if (pickup) {
            pickup.name = tile.properties.kind
            pickup.body.allowGravity = false;
            // setCollisionDimensions(pickup, this.collisionWidth, this.collisionHeight)
            this.createItemAnimations(fruitType)

        }
        this.scene.items = this.items
    }


    createItemAnimations(fruitType) {


        if (!this.isAnimation(fruitType)) {
            this.scene.anims.create({
                key: fruitType + "-animation",
                frames: this.scene.anims.generateFrameNumbers(fruitType, { start: 0, end: 16 }),
                frameRate: 20,
                repeat: -1,
            });
            this.animationKeys.push(fruitType + "-animation");
        }
    }

    isAnimation(fruitType) {
        return this.animationKeys.includes(fruitType + '-animation');
    }

    playItemsAnimation() {
        let rate = Phaser.Math.Between(50, 800);
        this.items.getChildren().forEach(item => {
            item.anims.play(item.texture.key + '-animation', true);
        });
    }

}