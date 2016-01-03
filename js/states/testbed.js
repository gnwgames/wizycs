'use strict'
var WizrdGame = WizrdGame || {}

WizrdGame.testbed =  function () {
  this.wizrd = {}
  this.collision = {}
}

WizrdGame.testbed.prototype = {
  preload: function() {
    // preloading all the assets
    this.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', './assets/maps/test1.png');
    this.load.image('collide', './assets/maps/sprite_sheet (6).png');
    this.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
    this.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    this.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
    // this.load.spritesheet('stave_equipped', './assets/sprites/stave.png', 55,55);
    // this.load.spritesheet('stave_diving', './assets/sprites/stave_straight.png', 55,55);
  }
}
