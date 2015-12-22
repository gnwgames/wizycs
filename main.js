'use strict'

var map, layer, keys, wzrd

// Game instantiation
var game = new Phaser.Game(800,600, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tiles', './assets/maps/test1.png')
  game.load.spritesheet('chars', './assets/maps/chartiles.png', 32, 32)
}

function create() {
  game.stage.backgroundColor = '#5DDCDE'
  map = game.add.tilemap('test1')
  map.addTilesetImage('tiles', 'tiles')
  layer = map.createLayer('world')
  layer.resizeWorld()
  wzrd = game.add.sprite(0,0, 'chars')
  wzrd.frame = 10
  wzrd.animations.add('left', [21,22,23,22], 3, true)
  wzrd.animations.add('right', [33,34,35,34], 3, true)
  keys = game.input.keyboard.createCursorKeys()
}

function update() {
  if (keys.left.isDown) {
    wzrd.animations.play('left')
  } else if (keys.right.isDown) {
    wzrd.animations.play('right')
  } else {
    wzrd.animations.stop()
    wzrd.frame = 10
  }
}
