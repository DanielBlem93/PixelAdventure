class Player1 extends Phaser.Physics.Arcade.Sprite {
    canJump = true
    particleEmitter
    particle
    jumped = false
    canDoubleJump = false;
    doubleJumpAnimationState = true

    jumpcounter = 0

    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setGravityY(100);


        this.createAnimations(scene);
    }



    update(cursor) {

        this.WalkAndIdle(cursor)
        this.jump(cursor)
        // this.falling()

    }


    WalkAndIdle(cursor) {
        if (cursor.left.isDown) {
            this.setFlipX(true)
            this.setVelocityX(-160);
            this.anims.play("left", true);

        } else if (cursor.right.isDown) {
            this.setFlipX(false)
            this.setVelocityX(160);
            this.anims.play("left", true);
        } else {
            this.setVelocityX(0);
            this.anims.play("idle", true);
        }
    }



    jump(cursor) {
        this.jumped = true
        let isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursor.up)
        let isJustUp = Phaser.Input.Keyboard.JustUp(cursor.up)
        let touchinGround = this.body.blocked.down
        let onAir = this.body.blocked.none
        // jumps when pressing up
        if (isJumpJustDown && (touchinGround || this.jumpcounter < 2)) {
            this.setVelocityY(-380)
            this.jumpcounter++
        }

        if (touchinGround && !isJumpJustDown) {
            this.jumpcounter = 0
            this.jumped= false
        }

        if (onAir && this.jumpcounter <= 1) {
       
            this.anims.play("jump",true)
        }
        // else if (onAir && this.jumpcounter > 1) {
        //     console.log("Playing double jump animation");
          
        //     this.anims.play('double-jump')
        //     console.log(this.anims.getTotalFrames())
  
        // }

      

    }

    falling() {
        if (this.body.velocity.y > 0) {
            this.anims.play("fall", true);
    
        }
    }




    doubleJump(cursor, isJumpJustDown, isJustUp) {


    }

    createAnimations(scene) {
        this.walkAndIdleAnimation(scene)
        this.jumpAndFallAnimation(scene)
    }


    walkAndIdleAnimation(scene) {
        scene.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player-idle", { start: 0, end: 10 }),
            frameRate: 20,
            repeat: -1,
        });

        scene.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player-walk", { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1,
        });
        scene.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player-walk", { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1,
        
        });
    }

    jumpAndFallAnimation(scene) {
        scene.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("player-jump", { start: 0, end: 0 }),
            frameRate: 20,
            repeat: -1,

        });
        scene.anims.create({
            key: "fall",
            frames: this.anims.generateFrameNumbers("player-fall", { start: 0, end: 0 }),
            frameRate: 20,
            repeat: -1,

        });
        scene.anims.create({
            key: "double-jump",
            frames: this.anims.generateFrameNumbers("player-doubleJump", { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
            
        
        });
    }
}