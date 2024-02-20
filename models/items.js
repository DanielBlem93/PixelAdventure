class Items {
    scene
    animationKeys
    itmes
    constructor(scene) {
        this.scene = scene;
        this.items = scene.physics.add.group();
        this.animationKeys = [];
    }

    createItems(tile) {
      
        let fruitType = tile.properties.kind;
        const x = tile.getCenterX();
        const y = tile.getCenterY() - 16;
        const pickup = this.items.create(x, y, fruitType);

        if (pickup) {
            pickup.body.width = 32;
            pickup.body.height = 32;
            pickup.body.allowGravity = false;
        
            this.createItemAnimations(fruitType)

        }     console.log(pickup)
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
        this.items.getChildren().forEach(item => {
            item.anims.play(item.texture.key + '-animation', true);
        });
    }
  
}