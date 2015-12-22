'use strict'

var map, layer, keys, wzrd, collision, flame, pika

// Game instantiation
var game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  // I load all my scripts in the html file
  // sort of superstition, because of errors before
  game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tiles', './assets/maps/test1.png')
  game.load.image('collide', './assets/maps/sprite_sheet (6).png')
  game.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64)
  game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32)
  game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24)
\}

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade)
  game.stage.backgroundColor = '#5DDCDE'
  map = game.add.tilemap('test1')
  map.addTilesetImage('tiles', 'tiles')
  map.addTilesetImage('collide', 'collide')
  layer = map.createLayer('world')
  collision = map.createLayer('collision')
  collision.visible = false
  // this value is seen in the json file for this tile map
  map.setCollision(106, true, collision)
  layer.resizeWorld()
  wzrd = new Player(game, 0, 0)
  pika = new PikaEnemy(game, 500, 50)

  // flame = game.add.sprite(wzrd.position.x, wzrd.position.y+16, 'flame')
  // flame.animations.add('fire', [16,17,18,19,20,21,22], 20, true)

  keys = game.input.keyboard.createCursorKeys()
  game.add.text(10,10, 'Arrow keys to move, and you can fly!')
  game.time.events.loop(Phaser.Timer.SECOND, function() {pika.updateState()}, this)
}

function update() {
  wzrd.collide(collision)
  wzrd.collide(pika)
  wzrd.handleInput(keys)

  pika.collide(collision)
  // else {
  //   // flame.visible = false
  //   // flame.animations.stop()
  // }
}
