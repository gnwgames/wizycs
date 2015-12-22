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
  game.load.spritesheet('chars', './assets/spritesheets/chartiles.png', 32, 32)
  game.load.image('ground', './assets/maps/ground.jpg');
}

var platforms;
function create() {
  game.stage.backgroundColor = '#5DDCDE'
  map = game.add.tilemap('test1')
  map.addTilesetImage('tiles', 'tiles')
  layer = map.createLayer('world')
  layer.resizeWorld()
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.body.immovable = true;


  wzrd = game.add.sprite(0,game.height-175, 'chars')
  wzrd.frame = 10
  wzrd.animations.add('left', [21,22,23,22], 3, true)
  wzrd.animations.add('right', [33,34,35,34], 3, true)
  game.physics.arcade.enable(wzrd);

  wzrd.body.bounce.y = 0.2;
  wzrd.body.gravity.y = 300;
  wzrd.body.collideWorldBounds = true;

  keys = game.input.keyboard.createCursorKeys()
}

function update() {
  wzrd.body.velocity.x = 0;
  game.physics.arcade.collide(wzrd, platforms);
  if (keys.left.isDown) {
    wzrd.body.velocity.x = -100;
    wzrd.animations.play('left')
  } else if (keys.right.isDown) {
    wzrd.body.velocity.x = 100;
    wzrd.animations.play('right')
  } else {
    wzrd.animations.stop();
    wzrd.frame = 10
  }

  if (keys.up.isDown && wzrd.body.touching.down) {
    wzrd.body.velocity.y = -200
  }

}
