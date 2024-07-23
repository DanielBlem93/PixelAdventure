
class PixelAdventure extends Phaser.Scene {
  assetsLoader
  player1
  level
  particles
  traps
  trapService
  scene
  currentLevel
  constructor() {
    super()
    this.assetsLoader = new PreloadAssets(this)
    this.traps = null
    this.trapService = new Trap_Service(this)
    this.currentLevel = 'debug_level'


  }

  cursors
  preload() {
    this.assetsLoader.preload();
  }

  create() {
    this.level = new Level(this, this.currentLevel);
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player1 = new Player1(this, 50, 150)
    this.addCollisions()
    this.cameras.main.centerOn(400, 300);
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player1);
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
      // this.currentLevel = 'menu'
      // this.scene.restart()
    }
  }


}

const config = {
  type: Phaser.AUTO,

  // backgroundColor: 0x999999,
  parent: 'thegame',
  scale: {

    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    resizeInterval: 500,
    width: 800,
    height: 600,
    //  zoom:5,
    // parent:
    expandParent: true,
    min: { width: 320, height: 480 },
    max: { width: 800, height: 600 },
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



