class Trap_Service {
    scene

    constructor(scene) {
        this.scene = scene;
    }


    stopTrapEffects(trap) {
        this.scene.time.delayedCall(300, () => {
            this.stopTween(trap)
            this.stopParticels(trap)
            this.stopAnimations(trap)
        });
        this.onTrapCollision(trap)
    }


    stopTween(trap) {
        if (trap.tween) {
            trap.tween.stop();
            trap.tween.remove();
            trap.tween = null;
        }else{}
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


    onTrapCollision(trap) {
        switch (trap.name) {
            case 'trap_falling_platform':
                this.fallingPlatform(trap)
                break;

            case 'fan':
                //somthing
                break;

            default:
                trap.body.destroy();
        }
    }


    fallingPlatform(trap) {
        this.scene.time.delayedCall(500, () => {
            trap.body.setAllowGravity(true);
            trap.body.setImmovable(false);
            trap.body.setVelocityY(250);
        });
        this.scene.time.delayedCall(5000, () => {
            trap.destroy();
          });
      
    }

}