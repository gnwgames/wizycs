'use strict'
var WizrdGame = WizrdGame || {}

WizrdGame.level1 = function(){
  this.wizrd = {}
  this.collision = {}
}

WizrdGame.level1.prototype = {
  preload: function() {
    this.load.image('tiles', './assets/maps/sprite_sheet (4).png')
    this.load.tilemap('level1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32)

  },

  create: function() {
    // start physics system, set background color, and
    // load the tilemap
    this.physics.startSystem(Phaser.Physics.Arcade)
    this.stage.backgroundColor = '#333'
    var map = this.add.tilemap('level1')
    map.addTilesetImage('world', 'tiles')
    // map.addTilesetImage('collide', 'collision')
    var layer = map.createLayer('stones')
    layer.setScale(2,2)
    this.collision = map.createLayer('collision')
    this.collision.setScale(2,2)
    this.collision.visible = false
    map.setCollision(1, true, this.collision)
    layer.resizeWorld()
    var keys = this.input.keyboard.createCursorKeys()
    this.wizrd = new Player(this.game, 50,64, keys)

  },

  update: function () {
    this.physics.arcade.collide(this.wizrd, this.collision)
  }
}
