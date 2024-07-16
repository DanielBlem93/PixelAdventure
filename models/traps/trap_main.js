class Traps {
    scene
    traps
    animationKeys
    particles
    falling_platform
    trampoline
    constructor(scene) {

        this.scene = scene;
        this.traps = scene.physics.add.group();
        this.trapAnimationKeys = []

    }



    createTraps(tile) {

        const trapType = tile.properties.trap
        const frameNumbers = tile.properties.frameNumbers
        const x =  this.getTilePosition(tile,'x');
        const y =  this.getTilePosition(tile,'y');

        const trap = this.traps.create(x, y, trapType);

        if (trap) {
            this.setTrapProperties(trap, tile, trapType)
            this.createTrapsAnimation(trapType, frameNumbers)
            trap.setPushable(tile.properties.pushable)

        }
        this.scene.traps = this.traps
        console.log('added traps', this.traps)

    }

    getTilePosition(tile, axis) {
        let position;
        let offset = tile.properties[`positionOffset${axis.toUpperCase()}`];
    
        if (offset !== 0) {
            position = tile[`getCenter${axis.toUpperCase()}`]() + offset;
        } else {
            position = tile[`getCenter${axis.toUpperCase()}`]();
        }
        return position;
    }

    setTrapProperties(trap, tile, trapType) {
        console.log(trap)
        trap.body.width = tile.properties.tileWidth
        trap.body.height = tile.properties.tileHeight
        trap.body.allowGravity = tile.properties.gravity
        trap.name = trapType
        trap.body.allowDrag = tile.properties.allowDrag
        setTrapBodyCenter(trap, tile.properties.centerOffsetX, tile.properties.centerOffsetY)


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
                break;
            case 'trap_trampoline':
                this.falling_platform = new Trampoline_Trap(this.scene, trap)

                break;

            default:
                break;
        }
    }






}
