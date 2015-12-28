'use strict'

var map, layer, keys, wzrd, collision, flame, pika, enemyGroup;

// Game instantiation
var game = new Phaser.Game(600,450, Phaser.AUTO, 'Wizycs', {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  // I load all my scripts in the html file
  // sort of superstition, because of errors before
  preloadScripts();
  preloadAssets();
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

  // this value is seen in the json file for this tile map
  map.setCollision(106, true, collision);
  layer.resizeWorld();

  createObjects();
  integrateObjects();
}

function createObjects() {
  keys = game.input.keyboard.createCursorKeys();
  wzrd = new Player(game, 0, 0);


  var pikas = [];
  pika = new PikaEnemy(game, 450, 50, 150, Enemy.ATTACK_TYPE.PURSUE);
  pikas.push(pika);

  //enemies = new EnemyGroup(pikas);
  //enemyGroup = EnemyGroup.Init();
  enemyGroup = new EnemyGroup();
  enemyGroup.addEnemies(pikas);
}

function integrateObjects() {
  Flame.hitGroups = enemyGroup;
  Melee.hitGroups = enemyGroup;

  // Equip the flame power to the key D / Melee to W
  wzrd.equip(Phaser.KeyCode.D, Flame.handleInput);
  wzrd.equip(Phaser.KeyCode.W, Melee.handleInput);

  enemyGroup.forEachAlive(function(enemy) {
    game.time.events.loop(Phaser.Timer.SECOND, function() {enemy.updateState()}, this);
  });

}

function update() {
  wzrd.collide(collision);
  wzrd.handleInput(keys);
  if (enemyGroup) {
      enemyGroup.forEachAlive(function(enemy) {
        enemy.collide(collision);
        wzrd.overlap(enemy);
        enemyGroup.distanceFromPlayer(enemy, wzrd);
    });
  }
  // somehow restart the level or respawn the player when it dies
  //if (!wzrd.alive) {
  //  GameHandler.RespawnPlayer(wzrd);
  //}

}


var preloadScripts = function() {
  game.load.script('EnemyGroup.js', './groups/EnemyGroup.js');
  game.load.script('CollisionHandler.js', './handlers/CollisionHandler.js');
  game.load.script('Flame.js', './models/children/Flame.js');
  game.load.script('Melee.js', './models/children/Melee.js');
  game.load.script('Pika.js', './models/children/Pika.js');
  game.load.script('Enemy.js', './models/parents/Enemy.js');
  game.load.script('Player.js', './models/parents/Player.js');
  game.load.script('Power.js', './models/parents/Power.js');
};

var preloadAssets = function() {
  game.load.script('GameHandler.js', './handlers/GameHandler.js');
  game.load.tilemap('test1', './assets/maps/wizycs_temp_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', './assets/maps/test1.png');
  game.load.image('collide', './assets/maps/sprite_sheet (6).png');
  game.load.spritesheet('flame', './assets/sprites/fireball.png', 64,64);
  game.load.spritesheet('chars', './assets/sprites/chartiles.png', 32, 32);
  game.load.spritesheet('pika', './assets/sprites/pika.jpg', 16,24);
  game.load.spritesheet('stave', './assets/sprites/stave.png', 32,32);
};