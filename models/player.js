class Player1 extends Phaser.Physics.Arcade.Sprite {
    canJump = true
    particleEmitter
    particle
    jumped = false
    canDoubleJump = false;
    doubleJumpAnimationState = true
    collisionWidth = 20
    collisionHeight = 30
    jumpcounter = 0

    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setGravityY(600);
        this.createAnimations(scene);
        setCollisionDimensions(this, this.collisionWidth, this.collisionHeight)
    }



    update(cursor) {

        this.WalkAndIdle(cursor)
        this.jumpAnimations(cursor)
        this.falling()

    }


    WalkAndIdle(cursor) {
        let touchinGround = this.body.blocked.down
        let noKeyPressd = !cursor.left.isDown && !cursor.right.isDown && !cursor.up.isDown

        if (cursor.left.isDown)
            this.movePlayer(touchinGround, true, -130)

        else if (cursor.right.isDown)
            this.movePlayer(touchinGround, false, 130)

        else if (noKeyPressd)
            this.idleAnimation(touchinGround)
    }


    movePlayer(touchinGround, flipx, speed) {
        this.setFlipX(flipx)
        this.setVelocityX(speed);// right 130 / left -130
        if (touchinGround)
            this.anims.play("left", true);
    }


    idleAnimation(touchinGround) {
        this.setVelocityX(0);
        if (touchinGround)
            this.anims.play("idle", true);
    }


    jumpAnimations(cursor) {
        let isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursor.up)
        let touchinGround = this.body.blocked.down
        let onAir = this.body.blocked.none
        this.jumped = true

        // jumps when pressing up
        if (isJumpJustDown && (touchinGround || this.jumpcounter < 2)) {
            this.jump()
        }
        if (touchinGround && !isJumpJustDown) {
            this.resetJump()
        }
        if (onAir && this.jumpcounter <= 1) {
            this.anims.play("jump", true) //first jump animation
        }
    }


    jump() {
        this.anims.play('double-jump')
        this.on('animationcomplete-double-jump', function () {
            this.anims.play("fall", true);
        })
        this.setVelocityY(-380)
        this.jumpcounter++
    }

    resetJump() {
        this.jumpcounter = 0
        this.jumped = false
    }



    falling() {
        if (this.body.velocity.y > 0) {
            this.anims.play("fall", true);
            if (this.jumpcounter < 1) {
                this.jumpcounter++
            }
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
            frameRate: 20,
            repeat: 0,
        });
    }
}