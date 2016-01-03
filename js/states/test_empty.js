'use strict'
var WizrdGame = WizrdGame || {}

WizrdGame.test_empty =  function () {
  this.wizrd = {}
  this.collision = {}
}

WizrdGame.test_empty.prototype = {
  preload: function() {
    this.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
    this.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    this.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
  },
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.physics.arcade.gravity.y = 100
    var keys = this.input.keyboard.createCursorKeys()
    this.wizrd = new Player(this.game, 0, 0, keys)
    this.wizrd.body.collideWorldBounds = true
    var pika = this.add.sprite(100,100, 'pika')
    pika.frame = 0
    pika.scale.setTo(2)
  },
  update: function() {

  }
}
