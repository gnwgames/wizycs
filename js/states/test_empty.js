'use strict'
var WizrdGame = WizrdGame || {}

WizrdGame.test_empty = function () {
  this.wizrd = {}
  this.collision = {}
  this.fireRate = 1000
  this.nextFire = 0
  this.gravityGroup = null
}

WizrdGame.test_empty.prototype = {
  preload: function() {
    this.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
    this.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    this.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
  },
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    // this.physics.arcade.gravity.y = 100
    var keys = this.input.keyboard.createCursorKeys()
    this.wizrd = new Player(this.game, 0, 0, keys)
    this.wizrd.body.collideWorldBounds = true
    this.gravityGroup = this.add.group()
    var pika = this.add.sprite(100,100, 'pika')
    pika.frame = 0
    pika.scale.setTo(2)
    this.physics.arcade.enable(pika)
    this.gravityGroup.add(pika)
    pika.body.gravity.y = 100
    pika.body.collideWorldBounds = true
    pika = this.add.sprite(200,100, 'pika')
    pika.frame = 0
    pika.scale.setTo(2)
    this.physics.arcade.enable(pika)
    this.gravityGroup.add(pika)
    pika.body.gravity.y = 100
    pika.body.collideWorldBounds = true
    pika = this.add.sprite(100,200, 'pika')
    pika.frame = 0
    pika.scale.setTo(2)
    this.physics.arcade.enable(pika)
    this.gravityGroup.add(pika)
    pika.body.gravity.y = 100
    pika.body.collideWorldBounds = true
    pika = this.add.sprite(150,100, 'pika')
    pika.frame = 0
    pika.scale.setTo(2)
    this.physics.arcade.enable(pika)
    this.gravityGroup.add(pika)
    pika.body.gravity.y = 100
    pika.body.collideWorldBounds = true
  },
  update: function() {
    if (this.input.activePointer.isDown) {
      if (this.time.now > this.nextFire) {
        this.nextFire = this.time.now + this.fireRate
        addGrav(this.gravityGroup, {x:this.input.x, y:this.input.y})
      }
    }

  }
}

function addGrav(spriteGroup, point) {
  spriteGroup.forEach(function(sprite){
  sprite.update = function () {
    var ax = (point.x - sprite.position.x)*3
    sprite.body.gravity.x = ax
    var ay = (point.y - sprite.position.y)*3
    sprite.body.gravity.y = ay
    // var drag = new Phaser.Point(-ax, -ay)
    sprite.body.drag.x = 50
    sprite.body.drag.y = 50
  }
})
}
