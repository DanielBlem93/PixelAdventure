class Traps {
    scene
    traps
    animationKeys


    constructor(scene) {
        this.scene = scene;
        this.traps = scene.physics.add.group();
        this.trapAnimationKeys = []
        const line1 = new Phaser.Curves.Line([100, 100, 100, 110]);
    }



    createTraps(tile) {

        const trapType = tile.properties.trap
        const frameNumbers = tile.properties.frameNumbers
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const trap = this.traps.create(x, y, trapType);

        if (trap) {
            console.log(trap)
            trap.body.width = tile.properties.tileWidth
            trap.body.height = tile.properties.tileHeight
            trap.body.allowGravity = false;

            this.createTrapsAnimation(trapType, frameNumbers)
            console.log(trap)
            console.log('traps', this.traps)
            trap.body.allowDrag = false
            trap.setPushable(false)

        }
        this.scene.traps = this.traps

    }



    createTrapsAnimation(trapType, frameNumbers) {

        if (!this.isAnimation(trapType)) {
            this.scene.anims.create({
                key: trapType + "-animation",
                frames: this.scene.anims.generateFrameNumbers(trapType, { start: 0, end: frameNumbers - 1 }),
                frameRate: 20,
                repeat: -1,
            });
            this.trapAnimationKeys.push(trapType + "-animation");
        }
    }

    isAnimation(trapType) {
        return this.trapAnimationKeys.includes(trapType + '-animation');
    }

    playTrapsAnimation() {
        this.traps.getChildren().forEach(trap => {
            trap.anims.play(trap.texture.key + '-animation', true);
            this.addUpDownMotion(trap)
        });

    }

    addUpDownMotion(trap) {
        let duration = Phaser.Math.Between(500, 700);
        let bounce = Phaser.Math.Between(1, 3);
        this.scene.tweens.add({
            targets: trap,
            y: trap.body.center.y + bounce,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'quint.inout'
        });
    }
}