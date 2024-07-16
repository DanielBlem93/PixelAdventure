class Trap_Service {
    scene

    constructor(scene) {
        this.scene = scene;
    }


    stopTrapEffects(trap, player) {
        this.onTrapCollision(trap, player)
    }

    onTrapCollision(trap, player) {
        switch (trap.name) {
            case 'trap_falling_platform':
                this.fallingPlatform(trap)
                break;

            case 'trap_spikes':
                this.scene.player1.playerDies(trap)
                break;

            case 'trap_trampoline':
            this.trampoline(trap,player)
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

        trampoline(trap, player){
            trap.anims.setRepeat(0)
            trap.anims.restart()
            player.setVelocityY(-800)
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