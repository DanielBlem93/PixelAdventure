class Player1 extends Phaser.Physics.Arcade.Sprite {
    canJump = true
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
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

        if (cursor.up.isDown && this.body.blocked.down && this.canJump && !cursor.up.isUp) {
            this.canJump = false
            this.setVelocityY(-380);
            this.anims.play("jump", true)
            console.log('jump' + this.canJump)
        }

        if (this.body.velocity.y > 0) {
            this.anims.play("fall", true);
        } else if (this.body.velocity.y < 0 && !this.body.blocked.down) {

            this.anims.play("jump", true)
        }
        if (cursor.up.isUp && this.body.blocked.down && !this.canJump) {
            this.canJump = true;
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
    }
}