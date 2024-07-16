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
                this.trampoline(trap, player)
                break;

            default:
                trap.body.destroy();
        }
    }


    fallingPlatform(trap) {
        if (trap.body.touching.up) {
            this.scene.time.delayedCall(200, () => {
                this.stopTween(trap)
                this.stopPlatformParticels(trap)
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


    stopPlatformParticels(trap) {
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

    trampoline(trap, player) {
        if (trap.body.touching.up) {
            trap.anims.setRepeat(0)
            trap.anims.restart()
            player.setVelocityY(-500)
            this.startTrampolineParticles(trap)
        }
    }

    startTrampolineParticles(trap) {
        if (trap.particles2 && trap.particles1) {
            trap.particles2.explode(4);
            trap.particles1.explode(4);
        }
    }





}