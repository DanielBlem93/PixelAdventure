class Trap_Service {
    scene
    currentPlatform

    constructor(scene) {
        this.scene = scene;
        this.currentPlatform = null;
    }

    setTrapBodyCenter(trap, centerX, centerY) {

        trap.body.setOffset(centerX, centerY);
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

            case 'trap_moving_platform_auto':
                if (player.body.blocked.left || player.body.blocked.right) {
                    // Ignoriere die Kollisionen für die linken und rechten Seiten
                    return false;
                } else
                    this.movingPlatform(trap, player)
                break;

            default:

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


    movingPlatform(platform, player) {
        this.currentPlatform = platform   // eventuel löschen
        player.setGravityY(7000)
    }



}