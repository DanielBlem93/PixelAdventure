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
        this.setGravityY(500);


        this.createAnimations(scene);
    }



    update(cursor) {

        this.WalkAndIdle(cursor)
        this.jump(cursor)

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
        
        // jumps when pressing up
        if (cursor.up.isDown && this.body.blocked.down && this.canJump) {
            this.canJump = false
            this.setVelocityY(-380);
            this.jumpcounter++
            console.log('jump')
        }

        //plays fallanimation when falling
        if (this.body.velocity.y > 0) {
            this.anims.play("fall", true);
        }
        //playes jumpanimation when above ground
        else if (this.body.velocity.y < 0 && !this.body.blocked.down && !this.doubleJumpAnimationState) {
            this.anims.play("jump", true)
        }
        else if (this.body.velocity.y < 0 && !this.body.blocked.down && this.doubleJumpAnimationState) {
            this.anims.play('double-jump', true)
        }
        //disalow jumping while holding up arrow (press once only)
        if (cursor.up.isUp && this.body.blocked.down && !this.canJump) {
            this.canJump = true;
        }
        this.doubleJump(cursor)
        console.log(this.doubleJumpAnimationState)
    }


    doubleJump(cursor) {

        if (this.body.blocked.down) {
            this.canDoubleJump = false;
            this.jumped = false
            this.doubleJumpAnimationState = false
        }

        if ((this.body.velocity.y < 0 || this.body.velocity.y > 0 || !this.canJump) && !this.canDoubleJump && !this.body.blocked.down && cursor.up.isUp) {

            this.canDoubleJump = true
        } else if (this.canDoubleJump && cursor.up.isDown && !this.jumped) {
            this.canDoubleJump = false
            this.setVelocityY(-480);
            this.jumped = true
            this.doubleJumpAnimationState = true
            console.log('doublejump')
        }

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
            frameRate: 30,
            repeat: -1,

        });
    }
}