class Moving_Platform extends Traps {
    platform
    collisionWidth = 32
    collisionHeight = 8
    particles1
    particles2
    platformSpeed
    platformMinX
    platformMaxX

    scene

    constructor(scene, platform) {
        super(scene)
        this.scene = scene
        this.platform = platform
    }

    putTrapOnStartPosition(platform, config, duration) {
        if (config) {
            platform.body.checkCollision.down = false
            platform.body.checkCollision.left = false
            platform.body.checkCollision.right = false
            platform.body.x = config.startPoint
            this.addMovement(platform, config, duration)
        }

    }

    addMovement(platform, config, duration) {

        let velocity = (config.endPoint - config.startPoint) / (duration / 1000)

        if (config.horz) {
            this.movePlatformHorz(platform, config, duration, velocity)
        } else {
            this.movePlatformVert(platform, config, duration)
        }
    }

    movePlatformHorz(platform, config, duration, velocity) {
        platform.setVelocityX(velocity)
        this.platform.tween = this.scene.tweens.add({
            targets: platform,
            loop: -1,
            x: { from: config.startPoint, to: config.endPoint },
            duration: duration,
            yoyo: true,
            ease: 'linear',
            onLoop: function () {
                platform.setVelocityX(velocity)
                platform.anims.play('trap_moving_platform_auto-animation')
            },
            onYoyo: function () {
                platform.setVelocityX(-velocity)
                platform.anims.playReverse('trap_moving_platform_auto-animation')
            }
        });
    }


    movePlatformVert(platform, config, duration) {
        this.platform.tween = this.scene.tweens.add({
            targets: platform,
            loop: -1,
            y: { from: config.startPoint, to: config.endPoint },
            duration: duration,
            yoyo: true,
            ease: 'linear',
            onLoop: function () {
                platform.anims.play('trap_moving_platform_auto-animation')
            },
            onYoyo: function () {
                platform.anims.playReverse('trap_moving_platform_auto-animation')
            }
        });
    }

}