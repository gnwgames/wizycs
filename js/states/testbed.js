'use strict'
var WizrdGame = WizrdGame || {}

WizrdGame.testbed =  function () {
  this.wizrd = {}
  this.collision = {}
}

WizrdGame.testbed.prototype = {
  preload: function() {
    // preloading all the assets
    game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', './assets/maps/test1.png');
    game.load.image('collide', './assets/maps/sprite_sheet (6).png');
    game.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
    game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
    game.load.spritesheet('stave_equipped', './assets/sprites/stave.png', 55,55);
    game.load.spritesheet('stave_diving', './assets/sprites/stave_straight.png', 55,55);
  }
}
