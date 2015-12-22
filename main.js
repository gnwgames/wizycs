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
    game.load.script('Game.js', './models/Game.js');
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

    enemy = Enemy.CreateEnemy(500, 50, 'chars', 20);

    game.add.text(10,10, 'Arrow keys to move, and you can fly!')

    Game.CreateKeyboardEvents();

}

function update() {

    Game.CreateMovementKeymap();
    game.physics.arcade.collide(wzrd, collision);
    game.physics.arcade.collide(enemy, collision);
}


