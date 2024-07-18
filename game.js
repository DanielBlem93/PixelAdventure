
class PixelAdventure extends Phaser.Scene {
  assetsLoader
  player1
  level
  particles
  traps
  trapService
  scene
  constructor() {
    super()
    this.assetsLoader = new PreloadAssets(this)
    this.traps = null
    this.trapService = new Trap_Service(this)


  }

  cursors
  preload() {
    this.assetsLoader.preload();
  }

  create() {

    this.cursors = this.input.keyboard.createCursorKeys()


    this.level = new Level(this, 'level1');
    this.level.create();

    this.player1 = new Player1(this, 30,150)
    this.addCollisions()
  }

  update() {
    this.player1.update(this.cursors);
    

  }

  restart() {
    this.scene.restart()
  }



  addCollisions() {

    this.worldLayer.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player1, this.worldLayer)
    this.physics.add.collider(this.player1, this.traps, this.handleTrapCollisions, null, this)
    this.physics.add.overlap(this.player1, this.items, this.handleItemCollisions, null, this)

  }

  handleTrapCollisions(player, trap) {
    this.trapService.onTrapCollision(trap, player)

  }


  handleItemCollisions(player, item) {
    if (item && item.active) {
      item.destroy();
      console.log('Item kollidiert');
    }
  }


}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 400,
  // backgroundColor: 0x999999,
  parent: 'thegame',
  scale: {

    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    resizeInterval: 500,
    // width:
    // height:
    //  zoom:5,
    // parent:
    expandParent: true,
    min: { width: 300, height: 240 },
    max: { width: 1024, height: 800 },
    autoRound: false,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 600
      }
    },
  },

  pixelArt: true,
  scene: [PixelAdventure],

};

let game = new Phaser.Game(config);



