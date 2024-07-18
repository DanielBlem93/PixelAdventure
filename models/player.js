class Player1 extends Phaser.Physics.Arcade.Sprite {
    canJump = true
    particleEmitter
    particle
    jumped = false
    canDoubleJump = false;
    wallJump = false
    doubleJumpAnimationState = true
    collisionWidth = 12
    collisionHeight = 18
    offsetX = 10
    offsetY = 12
    jumpcounter = 0
    dead = false
    onWall = false
    offWall = true
    lockedKeyLeft = false
    lockedKeyRight = false
    left = false
    right = false
    timer
    timerActive = false
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setGravityY(600);
        this.createAnimations(scene);
        this.setCollisionDimensions(this.collisionWidth, this.collisionHeight, this.offsetX, this.offsetY)
        this.remove
        console.log(this)
    }

    setCollisionDimensions(width, height, offsetX, offsetY) {
        this.body.setSize(width, height, true)
        this.body.setOffset(offsetX, offsetY);
    }

    update(cursor) {

        this.checkWallCollision()


        if (!this.dead && !this.onWall) {
            this.WalkAndIdle(cursor)
            this.jumpAnimations(cursor)
            this.falling()

        } else if (!this.dead && this.onWall) {
            this.setVelocityY(-20)
            this.anims.play('wallJump', true)
            this.jumpAnimations(cursor)
        }
        // this.logVar()
    }

    checkWallCollision() {
        const { body } = this;

        if ((body.blocked.left || body.blocked.right) && this.jumped && !body.blocked.down) {
            this.onWall = true;
            this.handleWallCollision(body.blocked.left, body.blocked.right);
        }
    }

    handleWallCollision(blockedLeft, blockedRight) {
        if (blockedLeft) {
            this.left = true;
            this.lockedKeyLeft = true;
            this.setFlipX(true);
        }

        if (blockedRight) {
            this.right = true;
            this.lockedKeyRight = true;
            this.setFlipX(false);
        }
    }



    WalkAndIdle(cursor) {
        let touchinGround = this.body.blocked.down
        let noKeyPressd = !cursor.left.isDown && !cursor.right.isDown && !cursor.up.isDown

        if (cursor.left.isDown && !this.lockedKeyLeft)
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
        if (onAir && this.jumpcounter <= 1 && !this.onWall) {
            this.anims.play("jump", true) //first jump animation
        }
        if (this.onWall) {
            this.jumpFromWall()

        }
    }

    jumpFromWall() {
        this.scene.input.keyboard.on('keydown', (event) => {
            if (event.key === 'ArrowUp' && this.onWall && this.left) {
                this.jumpFromWallLeft()
            } else if (event.key === 'ArrowUp' && this.onWall && this.right) {
                this.jumpFromWallRight()
            } else if (event.key === 'ArrowDown' && this.onWall) {
                this.fallFromWall()
            }
        });
    }


    jumpFromWallLeft() {
        this.resetJump()
        this.setVelocityX(130);
        this.setVelocityY(-380)
        this.anims.play("jump", true)
        this.onWall = false
        this.left = false
        setTimeout(() => {
            this.lockedKeyLeft = false
        }, 300);
    }

    jumpFromWallRight() {
        this.resetJump()
        this.setVelocityX(-130);
        this.setVelocityY(-380)
        this.anims.play("jump", true)
        this.onWall = false
        this.right = false
        setTimeout(() => {
            this.lockedKeyRight = false
        }, 300);
    }

    fallFromWall() {
        this.onWall = false
        this.left = false
        this.right = false
        setTimeout(() => {
            this.lockedKeyRight = false
            this.lockedKeyLeft = false
        }, 300);
    }


    jump() {
        this.setGravityY(600)
        this.anims.play('double-jump')
        this.on('animationcomplete-double-jump', function () {
            this.anims.play("fall", false);
        })
        this.setVelocityY(-380)
        this.jumpcounter++
    }

    resetJump() {
        this.jumpcounter = 0
        this.jumped = false
    }


    falling() {
        if (this.body.velocity.y > 0 && !this.onWall) {
            this.setGravityY(600)
        }

        if (this.body.velocity.y > 0 && !this.jumped && !this.onWall) {
            this.anims.play("fall", true);

            if (this.jumpcounter < 1) {
                this.jumpcounter++
            }
        }
    }



    playerDies(trap) {
        this.palyDeadAnimation()
        this.playerKnockBack()
        this.scene.cameras.main.shake(60)

        this.scene.time.delayedCall(1500, () => {
            this.dead = false
            this.scene.restart()
        });
    }

    palyDeadAnimation() {
        this.dead = true
        this.anims.pause()
        this.anims.play('hit'); // Todesanimation abspielen (falls vorhanden)
        this.body.allowRotation = true
        this.body.angularVelocity = -200
        this.body.checkCollision.none = true;
        this.setCollideWorldBounds(false);
    }

    playerKnockBack() {
        this.body.enable = true;
        this.body.setVelocityY(-350); // Knockback nach oben
        if (this.body.touching.right) {
            this.body.setVelocityX(-100); // Knockback nach links
            this.body.angularVelocity = -150
        } else if (this.body.touching.left) {
            this.body.setVelocityX(100); // Knockback nach rechts
            this.body.angularVelocity = 150
        } else {
            this.body.setVelocityX(Phaser.Math.Between(-100, 100))
        }
    }




    createAnimations(scene) {
        this.walkAndIdleAnimation(scene)
        this.jumpAndFallAnimation(scene)
        this.deadAnimation(scene)
        this.holdOnWallAnimation(scene)
    }


    walkAndIdleAnimation(scene) {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player-idle", { start: 0, end: 10 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player-walk", { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player-walk", { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1,
        });
    }

    jumpAndFallAnimation(scene) {
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("player-jump", { start: 0, end: 0 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "fall",
            frames: this.anims.generateFrameNumbers("player-fall", { start: 0, end: 0 }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "double-jump",
            frames: this.anims.generateFrameNumbers("player-doubleJump", { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0,
        });
    }


    deadAnimation(scene) {
        this.anims.create({
            key: "hit",
            frames: this.anims.generateFrameNumbers("player-hit", { start: 0, end: 6 }),
            frameRate: 20,
            repeat: 0,
        });
    }

    holdOnWallAnimation(scene) {
        this.anims.create({
            key: "wallJump",
            frames: this.anims.generateFrameNumbers("player-wallJump", { start: 0, end: 4 }),
            frameRate: 20,
            repeat: -1,
        });
    }


}