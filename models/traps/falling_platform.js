class Falling_platform_trap extends Traps {
    scene
    particles

    constructor(scene) {
        super(scene)
        this.scene = scene;

    }


    addEffects(trap) {
        this.addUpDownMotion(trap)
        this.addParticles(trap)
    }


    addUpDownMotion(trap) {
        let duration = Phaser.Math.Between(500, 700);
        let bounce = Phaser.Math.Between(1, 3);
        trap.tween = this.scene.tweens.add({
            targets: trap,
            y: trap.body.center.y + bounce,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'quint.inout'
        });
    }


    addParticles(trap) {
        let trapX = trap.body.center.x;
        let trapY = trap.body.center.y + 10;
        trap.particles = this.scene.add.particles(trapX, trapY +2, 'dust', {
            accelerationX: 0,
            accelerationY: 1000,
            alpha: { start: 0.2, end: 0.0, ease: 'Linear' },
            lifespan: 250,
            scale: { start: 0.8, end: 0.4, ease: 'Linear', random: true },
            speedX: { min: -5, max: 5 },
            speedY: { min: 70, max: 70 },
            x: { min: -10, max: 10 },
            y: 0,
            blendMode: 'ADD',
            gravityY: 500,
            frequency: 200,
   
        })
    }

}
