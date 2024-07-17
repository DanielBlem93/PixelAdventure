class Traps {
    scene
    trapService
    traps
    trap_settings = []
    animationKeys
    particles
    falling_platform
    movingPlatformAuto
    trampoline
    constructor(scene) {

        this.scene = scene;
        this.traps = scene.physics.add.group();
        this.trapService = this.scene.trapService
        this.trapAnimationKeys = []

    }



    createTraps(tile) {

        const trapType = tile.properties.trap
        const frameNumbers = tile.properties.frameNumbers
        const x = this.getTilePosition(tile, 'x');
        const y = this.getTilePosition(tile, 'y');
        const trap = this.traps.create(x, y, trapType);

        if (trap) {
            this.setTrapProperties(trap, tile, trapType)
            this.createTrapsAnimation(trapType, frameNumbers)
        }
        this.scene.traps = this.traps
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
        trap.body.width = tile.properties.tileWidth
        trap.body.height = tile.properties.tileHeight
        trap.body.allowGravity = tile.properties.gravity
        trap.name = trapType
        trap.body.allowDrag = tile.properties.allowDrag
        trap.setPushable(tile.properties.pushable)
        trap.setImmovable(tile.properties.immovable)
        trap.setFriction(tile.properties.friction)
        this.trapService.setTrapBodyCenter(trap, tile.properties.centerOffsetX, tile.properties.centerOffsetY)
        this.setPropertieJSON(trap, tile.properties, tile);

    }

    setPropertieJSON(trap, properties, tile) {
        const trapJSON = {
            trapType: trap.name,
            x: trap.x,
            y: trap.y,
            width: trap.body.width,
            height: trap.body.height,
            allowGravity: trap.body.allowGravity,
            allowDrag: trap.body.allowDrag,
            centerOffsetX: properties.centerOffsetX,
            centerOffsetY: properties.centerOffsetY,
            tileWidth: properties.tileWidth,
            tileHeight: properties.tileHeight,
            pushable: properties.pushable,
            frameNumbers: properties.frameNumbers,
            startPoint: properties.startPoint,
            endPoint: properties.endPoint,
            immovable: properties.immovable,
            trap: trap,
            tile: tile,
        };

        this.trap_settings.push(trapJSON);
        console.log('Trap settings:', this.trap_settings);
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
                this.trampoline = new Trampoline_Trap(this.scene, trap)
                this.trampoline.addEffects(trap)
                break

            case 'trap_moving_platform_auto':
                let config = this.getTrap(trap)
                this.movingPlatformAuto = new Moving_Platform(this.scene, trap, config)
                this.movingPlatformAuto.putTrapOnStartPosition(trap, config, 5000)

                break;

            default:
                break;
        }
    }


    getTrap(trap) {
        for (const t of this.trap_settings) {
            if (t.trap === trap) {
                return t; 
            }
        }
        return null;
    }




}
