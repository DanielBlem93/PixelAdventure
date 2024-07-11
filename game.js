
class PixelAdventure extends Phaser.Scene {
  assetsLoader
  player1
  level
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
    this.level = new Level(this, 'level1');
    this.level.create();

    this.player1 = new Player1(this, 200, 200)
    this.addCollisions()






    this.graphics = this.add.graphics();

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        //  The curves do not have to be joined
        const line1 = new Phaser.Curves.Line([ 100, 100, 100, 110 ]);

        this.path = this.add.path();

        // path = new Phaser.Curves.Path();

        this.path.add(line1);


        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Linear',
            duration: 800,
            yoyo: true,
            repeat: -1
        });







  }

  update() {
    this.player1.update(this.cursors);
    

  }

  addCollisions() {
    
    this.worldLayer.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player1, this.worldLayer)
    this.physics.add.collider(this.player1, this.traps)
    this.physics.add.overlap(this.player1, this.items, this.handleItemCollisions, null, this)
  
  }


  handleItemCollisions(player, item) {
    // Überprüfe, ob es sich um das richtige Item handelt
    if (item && item.active) {
      // Zerstöre das Item
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
      // debug: true,
      gravity: {
        y: 600
      }
    },
  },

  pixelArt: true,
  scene: [PixelAdventure],

};

let game = new Phaser.Game(config);



