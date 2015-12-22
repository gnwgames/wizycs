'use strict'

var map, layer, keys, wzrd, collision, flame, enemy

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
  game.load.spritesheet('flame', './assets/maps/fireball.png', 64,64)
  game.load.spritesheet('chars', './assets/maps/chartiles.png', 32, 32)
  game.load.spritesheet('pika', './assets/maps/pika.jpg', 16,24)
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
  wzrd = game.add.sprite(0,0, 'chars')
  enemy = game.add.sprite(500, 50, 'pika')
  enemy.animations.add('wr', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 21, true)
  enemy.animations.add('wl', [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 21, true)
  enemy.scale.setTo(1.5,1.5)
  game.physics.arcade.enable(enemy)
  enemy.body.gravity.y = 500

  flame = game.add.sprite(wzrd.position.x, wzrd.position.y+16, 'flame')
  flame.animations.add('fire', [16,17,18,19,20,21,22], 20, true)
  game.physics.arcade.enable(wzrd)
  wzrd.frame = 10
  wzrd.animations.add('left', [21,22,23,22], 5, true)
  wzrd.animations.add('right', [33,34,35,34], 5, true)
  wzrd.body.gravity.y = 500
  wzrd.body.collideWorldBounds = true
  game.camera.follow(wzrd)
  keys = game.input.keyboard.createCursorKeys()
  game.add.text(10,10, 'Arrow keys to move, and you can fly!')
  enemy.state = 'right'
  game.time.events.loop(Phaser.Timer.SECOND, function() {enemyWalk(enemy)}, this)
}

function update() {
  game.physics.arcade.collide(wzrd, collision)
  game.physics.arcade.collide(enemy, collision)
  if (keys.left.isDown) {
    wzrd.animations.play('left')
    wzrd.body.velocity.x = -130
  } else if (keys.right.isDown) {
    wzrd.animations.play('right')
    wzrd.body.velocity.x = 130
  } else {
    wzrd.animations.stop()
    wzrd.frame = 10
    wzrd.body.velocity.x = 0
  }

  if (keys.up.isDown) {
    flame.visible = true
    flame.position.x = wzrd.position.x - 15
    flame.position.y = wzrd.position.y + 13
    flame.play('fire')
    wzrd.body.velocity.y = -150
  } else {
    flame.visible = false
    flame.animations.stop()
  }
}

function enemyWalk(enemy) {
  switch (enemy.state){
    case 'left':
      enemy.animations.play('wl')
      enemy.body.velocity.x = -100
      enemy.state = 'stop'
      break
    case 'right':
      enemy.animations.play('wr')
      enemy.body.velocity.x = 100
      enemy.state = 'stop'
      break
    case 'stop':
      enemy.animations.stop()
      if (enemy.body.velocity.x > 0) {
        enemy.state = 'left'
      } else {
        enemy.state = 'right'
      }
      enemy.body.velocity.x = 0
      break
  }
}
