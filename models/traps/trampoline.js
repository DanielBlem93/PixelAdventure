class Trampoline_Trap extends Traps {
    trap
    collisionWidth = 28
    collisionHeight = 28

    scene

    constructor(scene, trap) {
        super(scene)
        this.scene = scene
        this.trap = trap
        this.stopTrampolineAnim()
        console.log(this.trap)
    }


    stopTrampolineAnim() {
        // this.scene.anims.anims.entries["trap_trampoline-animation"].pause()
        this.trap.anims.stop()
        
    }
    playTrampolineAnim() {
        this.scene.anims.anims.entries["trap_trampoline-animation"].play()
    }

}