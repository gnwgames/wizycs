'use strict'

var map, layer, keys, wzrd, collision, flame, enemy

// Game instantiation
var game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
    game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', './assets/maps/test1.png');
    game.load.image('collide', './assets/sprites/characterSprites.png');
    game.load.spritesheet('flame', './assets/sprites/fireball.png', 64, 64);
    game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
    //game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
    game.load.script('Player.js', './models/Player.js');
    game.load.script('Enemy.js', './models/Enemy.js');
    game.load.script('Powers.js', './models/Powers.js');
}

function create() {
    game.physics.startSystem(Phaser.Physics.Arcade);
    game.stage.backgroundColor = '#5DDCDE';
    map = game.add.tilemap('test1');
    map.addTilesetImage('tiles', 'tiles');
    map.addTilesetImage('collide', 'collide');
    layer = map.createLayer('world');
    collision = map.createLayer('collision');
    collision.visible = false;
    map.setCollision(106, true, collision);
    // map.setCollisionBetween(1,1000, true, layer);
    layer.resizeWorld();

    Player.CreatePlayer();

    Enemy.CreateEnemy(500, 50, 'chars', 20);
    game.add.text(10,10, 'Arrow keys to move, and you can fly!')

}

function update() {
    keys = game.input.keyboard.createCursorKeys();
    game.physics.arcade.collide(wzrd, collision);
    game.physics.arcade.collide(enemy, collision);
    if (keys.left.isDown) {
        wzrd.animations.play('left');
        wzrd.body.velocity.x = -130;
    } else if (keys.right.isDown) {
        wzrd.animations.play('right');
        wzrd.body.velocity.x = 130;
    } else if (keys.up.isDown) {
        wzrd.body.velocity.y = -150;
    } else {
        wzrd.animations.stop();
        wzrd.frame = 10;
        wzrd.body.velocity.x = 0;
    }

    if ((this.input.keyboard.isDown(Phaser.KeyCode.D)) && (keys.right.isDown))
    {
        Powers.Fire('right');
        /*
        flame.visible = true;
        flame.position.x = wzrd.position.x+15;
        flame.position.y = wzrd.position.y -15;
        flame.play('fireRight');
        */
    } else if ((this.input.keyboard.isDown(Phaser.KeyCode.D)) && (keys.left.isDown))
    {
        flame.visible = true;
        flame.position.x = wzrd.position.x-30;
        flame.position.y = wzrd.position.y -15;
        flame.play('fireLeft');
    } else {
        flame.visible = false;
        flame.animations.stop();
    }

    if ((this.input.keyboard.isDown(Phaser.KeyCode.A)) && (keys.right.isDown))
    {
        console.log('right melee');
    } else if ((this.input.keyboard.isDown(Phaser.KeyCode.A)) && (keys.left.isDown))
    {
        console.log('left melee');
    }
}

function enemyWalk(enemy) {
  switch (enemy.state){
    case 'left':
      enemy.animations.play('wl');
      enemy.body.velocity.x = -100;
      enemy.state = 'stop';
      break;
    case 'right':
      enemy.animations.play('wr');
      enemy.body.velocity.x = 100;
      enemy.state = 'stop';
      break;
    case 'stop':
      enemy.animations.stop();
      if (enemy.body.velocity.x > 0) {
        enemy.state = 'left'
      } else {
        enemy.state = 'right'
      }
      enemy.body.velocity.x = 0;
      break
  }
}

var SpellInstance = function (game, key) {

  Phaser.Sprite.call(this, game, 0, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false;
  this.scaleSpeed = 0;

};
