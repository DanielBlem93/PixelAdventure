class Item {
    scene
    constructor(scene, x, y) {
        this.scene = scene;
        this.apples = scene.physics.add.group();
    }

    createItems(tile) {
        let pickup;
        const x = tile.getCenterX();
        const y = tile.getCenterY() - 16;
        if (tile.properties.collectable) {
            pickup = this.apples.create(x, y, 'apple');

        }
        if (pickup) {
            pickup.body.width = 32;
            pickup.body.height = 32;
            pickup.body.allowGravity = false;
        }
   
    }
    createItemAnimations() {
        this.scene.anims.create({
            key: "apple-animation",
            frames: this.scene.anims.generateFrameNumbers("apple", { start: 0, end: 16 }),
            frameRate: 20,
            repeat: -1,
        });
    }

    playItemsAnimation() {
        this.apples.getChildren().forEach(apple => {
            console.log(apple)
            apple.anims.play('apple-animation', true);
    
        });
    }

}