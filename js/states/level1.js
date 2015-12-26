var WizrdGame = WizrdGame || {}

WizrdGame.level1 = function(){}

WizrdGame.level1.prototype = {
  preload: function() {
    this.load.image('tiles', './assets/maps/sprite_sheet (4).png')
    this.load.tilemap('level1', './assets/maps/level1.json')

  },

  create: function() {
    // start physics system, set background color, and
    // load the tilemap
    this.physics.startSystem(Phaser.Physics.Arcade)
    game.stage.backgroundColor = '#333'
    map = this.add.tilemap('level1')
    map.addTilesetImage('tiles', 'world')
    // map.addTilesetImage('collide', 'collision')
    layer = map.createLayer('stones')
    collision = map.createLayer('collision')
    collision.visible = false
    map.setCollision(1, true, collision)
    layer.resizeWorld()

  }
}
