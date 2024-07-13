class Trap_Service {
    scene

    constructor(scene) {
        this.scene = scene;
    }


    stopTrapEffects(trap) {
        this.onTrapCollision(trap)
    }

    onTrapCollision(trap) {
        switch (trap.name) {
            case 'trap_falling_platform':
                this.fallingPlatform(trap)
                break;

            case 'trap_spikes':
                this.scene.player1.playerDies(trap) 
                break;

            default:
                trap.body.destroy();
        }
    }


    fallingPlatform(trap) {
        if (trap.body.touching.up) {
            this.scene.time.delayedCall(200, () => {
                this.stopTween(trap)
                this.stopParticels(trap)
                this.stopAnimations(trap)
            });
            this.scene.time.delayedCall(400, () => {
                trap.body.checkCollision.none = true;
                trap.body.setAllowGravity(true);
                trap.body.setImmovable(false);
                trap.body.setVelocityY(250);
            });
            this.scene.time.delayedCall(5000, () => {
                trap.destroy();
            });
        }
    }


    stopTween(trap) {
        if (trap.tween) {
            trap.tween.stop();
            trap.tween.remove();
            trap.tween = null;
        } else { }
    }


    stopParticels(trap) {
        if (trap.particles) {
            trap.particles.destroy();
            trap.particles = null;
        }
    }


    stopAnimations(trap) {
        if (trap.anims) {
            trap.anims.stop()
        }
    }


   

}