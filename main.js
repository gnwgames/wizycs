'use strict'

var map, layer

// Game instantiation
var game = new Phaser.Game(800,600, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create
})

function preload() {
  game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tiles', './assets/maps/test1.png')
}

function create() {
  game.stage.backgroundColor = '#5DDCDE'
  map = game.add.tilemap('test1')
  map.addTilesetImage('tiles', 'tiles')
  layer = map.createLayer('world')
  layer.resizeWorld()

}
