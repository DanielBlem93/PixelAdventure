class Trampoline_Trap extends Traps {
    trap
    collisionWidth = 28
    collisionHeight = 28
    particles1
    particles2

    scene

    constructor(scene, trap) {
        super(scene)
        this.scene = scene
        this.trap = trap
        this.stopTrampolineAnim()
        console.log(this.trap)
    }


    stopTrampolineAnim() {
        this.trap.anims.stop()

    }


    addEffects(trap) {
        this.addParticlesLeft(trap)
        this.addParticlesRight(trap)
    }

    addParticlesLeft(trap) {
        let trapX = trap.body.center.x;
        let trapY = trap.body.center.y + 10;
        trap.particles1 = this.scene.add.particles(trapX, trapY + 2, 'dust', {
            angle: { min: 0, max: 360 },
            accelerationX: 50,
            accelerationY: { min: 0, max: -50 },
            alpha: { start: 0.5, end: 0.0, ease: 'Linear' },
            lifespan: { min: 150, max: 300 },
            scale: { start: 0.2, end: 1, ease: 'Linear', },
            speedX: { min: -50, max: -100 },
            speedY: { min: -0, max: -100 },
            x: { min: -10, max: -10 },
            y: 0,
            blendMode: 'ADD',
            gravityY: -100,
            frequency: -1,
            maxParticles: 10,
            quantity: 3,
            on: false // ensure it doesn't start automatically
        })
    }

    addParticlesRight(trap) {
        let trapX = trap.body.center.x;
        let trapY = trap.body.center.y + 10;
        trap.particles2 = this.scene.add.particles(trapX, trapY + 2, 'dust', {
            angle: { min: 0, max: 360 },
            accelerationX: -50,
            accelerationY: { min: 0, max: -50 },
            alpha: { start: 0.5, end: 0.0, ease: 'Linear' },
            lifespan: { min: 150, max: 300 },
            scale: { start: 0.2, end: 1, ease: 'Linear', },
            speedX: { min: 50, max: 100 },
            speedY: { min: -0, max: -100 },
            x: { min: 10, max: 10 },
            y: 0,
            blendMode: 'ADD',
            gravityY: -100,
            frequency: -1,
            maxParticles: 10,
            quantity: 3,
            on: false // ensure it doesn't start automatically

        })
    }

    triggerParticles() {
        if (this.trap.particles2 && this.trap.particles1) {
            this.trap.particles2.explode(4);
            this.trap.particles1.explode(4);
        }
    }
}