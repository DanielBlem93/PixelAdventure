class Traps {
    scene
    traps
    animationKeys
    particles
    falling_platform
    constructor(scene) {

        this.scene = scene;
        this.traps = scene.physics.add.group();
        this.trapAnimationKeys = []

    }



    createTraps(tile) {

        const trapType = tile.properties.trap
        const frameNumbers = tile.properties.frameNumbers
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const trap = this.traps.create(x, y, trapType);

        if (trap) {
            this.setTrapProperties(trap, tile, trapType)
            this.createTrapsAnimation(trapType, frameNumbers)
            trap.setPushable(tile.properties.pushable)
        }
        this.scene.traps = this.traps
        console.log('added traps', this.traps)

    }

    setTrapProperties(trap, tile, trapType) {
        trap.body.width = tile.properties.tileWidth
        trap.body.height = tile.properties.tileHeight
        trap.body.allowGravity = tile.properties.gravity
        trap.name = trapType
        trap.body.allowDrag = tile.properties.allowDrag
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
            this.addTrapEffects(trap, trap.name)
        });

    }


    addTrapEffects(trap, trapType) {

        switch (trapType) {
            case 'trap_falling_platform':
                this.falling_platform = new Falling_platform_trap(this.scene)
                this.falling_platform.addEffects(trap)
                console.log('added trap effects')
                break;

            default:
                break;
        }
    }






}
