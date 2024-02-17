
class PixelAdventure extends Phaser.Scene {
  assetsLoader
  player1
  constructor() {
    super('PixelAdventure')
    this.assetsLoader = new PreloadAssets(this)
  }

  cursors
  preload() {
    this.assetsLoader.preload();

 
   
  }

  create() {
 
    this.cursors = this.input.keyboard.createCursorKeys()

    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('Terrain', 'Terrain')
    const Hintergrund2 = map.addTilesetImage('Hintergrund2', 'Hintergrund2')
    const bellowLayer = map.createLayer('belowPlayer', Hintergrund2, 0, 0)
    const worldLayer = map.createLayer('worldLayer', tileset, 0, 0)
    const aboveLayer = map.createLayer('abovePlayer', tileset, 0, 0)

    worldLayer.setCollisionByProperty({ collides: true })



    const debugGraphics = this.add.graphics().setAlpha(0.5)
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 255, 50, 255),
      faceColor: new Phaser.Display.Color(0, 255, 0, 255)
    })

   
    this.player1 = new Player1(this, 200,200,'player-walk')
    this.physics.add.collider(this.player1, worldLayer)
  }

  update() {
    this.player1.update(this.cursors);
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



