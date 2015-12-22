'use strict'

var map, layer, keys, wzrd, collision, flame, pika

// Game instantiation
var game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tiles', './assets/maps/test1.png')
  game.load.image('collide', './assets/maps/sprite_sheet (6).png')
  game.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64)
  game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32)
  game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24)
  // game.load.script('player', './models/player.js')
}

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade)
  game.stage.backgroundColor = '#5DDCDE'
  map = game.add.tilemap('test1')
  map.addTilesetImage('tiles', 'tiles')
  map.addTilesetImage('collide', 'collide')
  layer = map.createLayer('world')
  collision = map.createLayer('collision')
  collision.visible = false
  map.setCollision(106, true, collision)
  // map.setCollisionBetween(1,1000, true, layer)
  layer.resizeWorld()
  wzrd = new Player(game, 0, 0)
  // wzrd = game.add.sprite(0,0, 'chars')
  pika = new PikaEnemy(game, 500, 50)

  // flame = game.add.sprite(wzrd.position.x, wzrd.position.y+16, 'flame')
  // flame.animations.add('fire', [16,17,18,19,20,21,22], 20, true)
  // game.physics.arcade.enable(wzrd)
  // wzrd.frame = 10
  // wzrd.animations.add('left', [21,22,23,22], 5, true)
  // wzrd.animations.add('right', [33,34,35,34], 5, true)
  // wzrd.body.gravity.y = 500
  // wzrd.body.collideWorldBounds = true
  // game.camera.follow(wzrd)
  keys = game.input.keyboard.createCursorKeys()
  game.add.text(10,10, 'Arrow keys to move, and you can fly!')
  game.time.events.loop(Phaser.Timer.SECOND, function() {pika.updateState()}, this)
}

function update() {
  wzrd.collide(collision)
  pika.collide(collision)
  wzrd.collide(pika)
  if (keys.left.isDown) {
    wzrd.l()
  } else if (keys.right.isDown) {
    wzrd.r()
  } else {
    wzrd.st()
  }

  if (keys.up.isDown) {
    // flame.visible = true
    // flame.position.x = wzrd.position.x - 15
    // flame.position.y = wzrd.position.y + 13
    // flame.play('fire')
    wzrd.fly()

  } else {
    // flame.visible = false
    // flame.animations.stop()
  }
}
